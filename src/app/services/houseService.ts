import { ref, set, get, update, remove } from "firebase/database";
import type { House } from "../DataModels/House";
import { database } from "../Firebase/firebaseConfig";

// Create a new house
export async function createHouse(house: House): Promise<void> {
  try {
    await set(ref(database, `houses/${house.houseId}`), house);
  } catch (error) {
    console.error('Error creating house:', error);
    throw error;
  }
}

// Get a single house by ID
export async function getHouse(houseId: string): Promise<House | null> {
  const db = database;
  try {
    const snapshot = await get(ref(db, `houses/${houseId}`));
    return snapshot.exists() ? snapshot.val() as House : null;
  } catch (error) {
    console.error('Error getting house:', error);
    throw error;
  }
}

// Get all houses
export async function getAllHouses(): Promise<House[]> {
  const db = database;
  try {
    const snapshot = await get(ref(db, 'houses'));
    if (!snapshot.exists()) return [];
    
    const houses: House[] = [];
    snapshot.forEach((childSnapshot) => {
      houses.push(childSnapshot.val() as House);
    });
    return houses;
  } catch (error) {
    console.error('Error getting all houses:', error);
    throw error;
  }
}

// Update a house
export async function updateHouse(houseId: string, updates: Partial<House>): Promise<void> {
  const db = database;
  try {
    await update(ref(db, `houses/${houseId}`), updates);
  } catch (error) {
    console.error('Error updating house:', error);
    throw error;
  }
}   

// Delete a house
export async function deleteHouse(houseId: string): Promise<void> {
  const db = database;
  try {
    await remove(ref(db, `houses/${houseId}`));
  } catch (error) {
    console.error('Error deleting house:', error);
    throw error;
  }
}

// Helper function to generate a new house ID
export function generateHouseId(): string {
  return 'house_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export async function getHouseById(houseId: string): Promise<House | null> {
  try {
    const snapshot = await get(ref(database, `houses/${houseId}`))
    return snapshot.exists() ? { houseId, ...snapshot.val() } : null
  } catch (error) {
    console.error('Error fetching house:', error)
    return null
  }
} 