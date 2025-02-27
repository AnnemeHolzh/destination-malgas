import { House } from '../app/DataModels/House';
import { auth } from '../app/Firebase/firebaseConfig';
import { logErrorToFirebase } from '../app/services/errorService';

const FIREBASE_DATABASE_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  await logErrorToFirebase(new Error('User not authenticated'), 'getAuthToken');
  return user.getIdToken();
}

export async function addHouse(house: House): Promise<void> {
  const token = await getAuthToken();
  const response = await fetch(
    `${FIREBASE_DATABASE_URL}/houses/${house.houseId}.json?auth=${token}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(house)
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    await logErrorToFirebase(new Error('Failed to create house'), 'addHouse', errorData);
    throw new Error(errorData.error || 'Failed to create house');
  }
}

export async function updateHouse(houseId: string, updates: Partial<House>): Promise<void> {
  const token = await getAuthToken();
  const response = await fetch(
    `${FIREBASE_DATABASE_URL}/houses/${houseId}.json?auth=${token}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    await logErrorToFirebase(new Error('Failed to update house'), 'updateHouse', errorData);
    throw new Error(errorData.error || 'Failed to update house');
  }
} 