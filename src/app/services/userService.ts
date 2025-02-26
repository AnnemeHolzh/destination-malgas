import { ref, set, get, update, remove } from "firebase/database";
import type { User } from "../DataModels/User";
import { database } from "../Firebase/firebaseConfig";
import bcrypt from "bcryptjs";
import { logErrorToFirebase } from './errorService';

// Create a new user
export async function createUser(user: User): Promise<void> {
  try {
    await set(ref(database, `users/${user.uid}`), user);
  } catch (error) {
    console.error('Error creating user:', error);
    await logErrorToFirebase(error, 'createUser', { userId: user.uid });
    throw error;
  }
}

// Get a single user by ID
export async function getUser(uid: string): Promise<User | null> {
  try {
    const snapshot = await get(ref(database, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() as User : null;
  } catch (error) {
    console.error('Error getting user:', error);
    await logErrorToFirebase(error, 'getUser', { userId: uid });
    throw error;
  }
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  try {
    const snapshot = await get(ref(database, 'users'));
    if (!snapshot.exists()) return [];
    
    const users: User[] = [];
    snapshot.forEach((childSnapshot) => {
      users.push(childSnapshot.val() as User);
    });
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    await logErrorToFirebase(error, 'getAllUsers');
    throw error;
  }
}

// Update a user
export async function updateUser(uid: string, updates: Partial<User>): Promise<void> {
  try {
    await update(ref(database, `users/${uid}`), updates);
  } catch (error) {
    console.error('Error updating user:', error);
    await logErrorToFirebase(error, 'updateUser', { userId: uid });
    throw error;
  }
}

// Delete a user
export async function deleteUser(uid: string): Promise<void> {
  try {
    await remove(ref(database, `users/${uid}`));
  } catch (error) {
    console.error('Error deleting user:', error);
    await logErrorToFirebase(error, 'deleteUser', { userId: uid });
    throw error;
  }
}

// Helper function to generate a new user ID
export function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10); // 10 is the salt rounds
} 