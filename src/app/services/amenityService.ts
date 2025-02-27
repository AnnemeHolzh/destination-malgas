import { ref, set, get, update, remove } from "firebase/database";
import type { Amenity } from "../DataModels/Amenity";
import { database } from "../Firebase/firebaseConfig";
import { logErrorToFirebase } from './errorService'

// Create a new amenity
export async function createAmenity(amenity: Amenity): Promise<void> {
  try {
    await set(ref(database, `amenities/${amenity.amenityId}`), amenity);
  } catch (error) {
    console.error('Error creating amenity:', error);
    await logErrorToFirebase(error, 'createAmenity', { amenityId: amenity.amenityId });
    throw error;
  }
}

// Get a single amenity by ID
export async function getAmenity(amenityId: string): Promise<Amenity | null> {
  try {
    const snapshot = await get(ref(database, `amenities/${amenityId}`));
    return snapshot.exists() ? snapshot.val() as Amenity : null;
  } catch (error) {
    console.error('Error getting amenity:', error);
    await logErrorToFirebase(error, 'getAmenity', { amenityId });
    throw error;
  }
}

// Get all amenities
export async function getAllAmenities(): Promise<Amenity[]> {
  try {
    const snapshot = await get(ref(database, 'amenities'));
    if (!snapshot.exists()) return [];
    
    const amenities: Amenity[] = [];
    snapshot.forEach((childSnapshot) => {
      amenities.push(childSnapshot.val() as Amenity);
    });
    return amenities;
  } catch (error) {
    console.error('Error getting all amenities:', error);
    await logErrorToFirebase(error, 'getAllAmenities');
    throw error;
  }
}

// Update an amenity
export async function updateAmenity(amenityId: string, updates: Partial<Amenity>): Promise<void> {
  try {
    await update(ref(database, `amenities/${amenityId}`), updates);
  } catch (error) {
    console.error('Error updating amenity:', error);
    await logErrorToFirebase(error, 'updateAmenity', { amenityId });
    throw error;
  }
}

// Delete an amenity
export async function deleteAmenity(amenityId: string): Promise<void> {
  try {
    await remove(ref(database, `amenities/${amenityId}`));
  } catch (error) {
    console.error('Error deleting amenity:', error);
    await logErrorToFirebase(error, 'deleteAmenity', { amenityId });
    throw error;
  }
}

// Helper function to generate a new amenity ID
export function generateAmenityId(): string {
  return 'amenity_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export async function getAmenities(): Promise<Amenity[]> {
  try {
    const snapshot = await get(ref(database, 'amenities'))
    if (!snapshot.exists()) return []
    
    return Object.values(snapshot.val()) as Amenity[]
  } catch (error) {
    console.error('Error fetching amenities:', error)
    throw error
  }
} 