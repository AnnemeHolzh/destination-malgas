export interface ErrorLog {
  id: string;
  timestamp: number;
  errorMessage: string;
  userId: string | null;
  location: string;
  stackTrace?: string;
  additionalData?: Record<string, unknown>;
} 