import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from '../destinationmalgasdb-c1203-firebase-adminsdk-oy1xw-44aff9e790.json' assert { type: 'json' };
import { ServiceAccount } from 'firebase-admin';
import { House } from '../src/app/DataModels/House';

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = getDatabase();

async function migrateHouses() {
  const housesRef = db.ref('houses');
  const snapshot = await housesRef.once('value');
  const houses = snapshot.val();

  const updates: Record<string, Partial<House>> = {};
  
  Object.keys(houses).forEach(houseId => {
    const house = houses[houseId];
    
    // Migrate capacity
    const oldCapacity = house.capacity || { adults: 0, children: 0 };
    const newCapacity = (oldCapacity.adults || 0) + (oldCapacity.children || 0);
    
    // Migrate amenities
    const newAmenities: Record<string, { available: boolean; amount: number }> = {};
    Object.entries(house.amenities || {}).forEach(([amenityId, value]) => {
      const isAvailable = value === true;
      newAmenities[amenityId] = {
        available: isAvailable,
        amount: isAvailable ? 1 : 0
      };
    });

    updates[`houses/${houseId}`] = {
      ...house,
      capacity: newCapacity,
      shortDescription: house.shortDescription || '',
      amenities: newAmenities
    };
  });

  await housesRef.update(updates);
  console.log('Migration completed successfully');
}

migrateHouses().catch(console.error); 