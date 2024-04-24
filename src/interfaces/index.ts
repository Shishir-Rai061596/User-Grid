export interface User {
  createdAt: string;
  name: string;
  avatar: string;
  hobby: string;
  location: string;
  id: string;
  creationDate: string;
}

export interface UserState {
  loading: true | false;
  users: User[];
  error: string;
}

export interface RootState {
  users: UserState;
}
