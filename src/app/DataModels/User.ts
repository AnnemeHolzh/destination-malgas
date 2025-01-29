export interface User {
  uid: string;
  email: string;
  name: string;
  password: string;
  role: 'staff' | 'user';
  createdAt: number;
  lastLogin?: number;
  loginAttempts?: number;
}