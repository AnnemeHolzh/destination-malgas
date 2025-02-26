import { ref, push } from "firebase/database";
import { database, auth } from "../Firebase/firebaseConfig";
import type { ErrorLog } from "../DataModels/ErrorLog";

export async function logErrorToFirebase(error: unknown, location: string, additionalData?: Record<string, unknown>): Promise<void> {
  try {
    const errorLog: ErrorLog = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
      errorMessage: error instanceof Error ? error.message : String(error),
      userId: auth.currentUser?.uid || null,
      location,
      stackTrace: error instanceof Error ? error.stack : undefined,
      additionalData
    };

    const errorRef = ref(database, 'errorLogs');
    await push(errorRef, errorLog);
  } catch (loggingError) {
    console.error('Failed to log error to Firebase:', loggingError);
  }
} 