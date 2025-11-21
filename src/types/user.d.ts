export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  hasPassword?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
