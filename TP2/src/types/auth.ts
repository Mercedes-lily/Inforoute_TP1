export interface User {
	  id: number;
	  username: string;
	  email: string;
	  role: "admin" | "user";
}

export interface AuthState {
	  user: User | null;
	  token: string | null;
	  loading: boolean;
	  error: string | null;
	  
}