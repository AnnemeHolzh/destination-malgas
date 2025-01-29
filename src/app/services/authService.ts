import { ref, get } from "firebase/database"
import { database } from "../Firebase/firebaseConfig"
import { User } from "../DataModels/User"
import bcrypt from "bcryptjs"

const SALT_ROUNDS = 12
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

interface LoginAttempt {
  count: number
  lastAttempt: number
}

const loginAttempts = new Map<string, LoginAttempt>()

export async function loginUser(email: string, password: string): Promise<User> {
  // Convert email to lowercase for case-insensitive comparison
  const normalizedEmail = email.toLowerCase()
  
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
    // Get user by email
    const snapshot = await get(ref(database, 'users'))
    let user: User | null = null

    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val() as User
      // Compare emails case-insensitively
      if (userData.email.toLowerCase() === normalizedEmail) {
        user = userData
      }
    })

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // Verify password
    const isValid = await bcrypt.compare(password, (user as User).password)
    if (!isValid) {
      throw new Error("Invalid email or password")
    }

    // Reset login attempts on successful login
    loginAttempts.delete(normalizedEmail)

    // Remove password from returned user object
    const { password: _, ...safeUser } = user as Record<string, any>
    return safeUser as User
  } catch (error) {
    // Increment login attempts using normalized email
    loginAttempts.set(normalizedEmail, {
      count: (attempt.count || 0) + 1,
      lastAttempt: Date.now()
    })
    
    throw error
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
} 