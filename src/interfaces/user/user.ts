export interface IUser {
  id: string;
  username: string;
  email: string;
  is_artist: boolean;
  availability: string;
  subscription: string;
  collections: string[];
}

export interface IConnectedUser {
  token: string;
  user: IUser;
}
