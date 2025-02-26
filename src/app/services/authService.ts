import { ref, get, update, remove } from "firebase/database"
import { database } from "../Firebase/firebaseConfig"
import { User } from "../DataModels/User"
import bcrypt from "bcryptjs"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/firebaseConfig"
import { logErrorToFirebase } from './errorService'

const SALT_ROUNDS = 12
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

interface LoginAttempt {
  count: number
  lastAttempt: number
}

const loginAttempts = new Map<string, LoginAttempt>()

export async function loginUser(email: string, password: string): Promise<User> {
  // Add validation and type conversion
  if (typeof email !== 'string') {
    throw new Error('Invalid email format');
  }
  
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check login attempts
  const attempt = loginAttempts.get(normalizedEmail) || { count: 0, lastAttempt: 0 }
  
  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    const timeLeft = attempt.lastAttempt + LOCKOUT_TIME - Date.now()
    if (timeLeft > 0) {
      throw new Error(`Too many login attempts. Please try again in ${Math.ceil(timeLeft / 60000)} minutes`)
    }
    loginAttempts.delete(normalizedEmail)
  }

  try {
    // First try Firebase Auth login
    const { user: authUser } = await signInWithEmailAndPassword(auth, email, password);
    
    // Then get the database user record
    const userRef = ref(database, `users/${authUser.uid}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      throw new Error("User not found in database");
    }
    
    return snapshot.val();
  } catch (authError) {
    await logErrorToFirebase(authError, 'loginUser', {
      email: normalizedEmail,
      isLegacyFallback: false
    });
    // Fallback to legacy login
    console.log(authError)
    const snapshot = await get(ref(database, 'users'));
    let user: User | null = null;
    
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val() as User;
      if (userData.email.toLowerCase() === normalizedEmail) {
        user = userData;
      }
    });

    if (!user || !(await bcrypt.compare(password, (user as User).password))) {
      throw new Error("Invalid credentials");
    }

    // Migrate legacy user to Firebase Auth
    const { user: authUser } = await createUserWithEmailAndPassword(
      auth,
      (user as User).email,
      password
    );
    
    // Update database record with new UID
    await update(ref(database, `users/${authUser.uid}`), {
      ...(user as User),
      uid: authUser.uid
    });
    
    // Remove old record
    await remove(ref(database, `users/${(user as User).uid}`));

    return { ...(user as User), uid: authUser.uid };
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
} 