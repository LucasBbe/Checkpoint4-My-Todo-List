export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
