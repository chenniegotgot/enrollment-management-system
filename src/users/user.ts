export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
}
