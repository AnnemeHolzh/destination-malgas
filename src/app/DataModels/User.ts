interface User {
  uid: string;
  email: string;
  name: string;
  role: 'staff' | 'user';
  createdAt: number;
}