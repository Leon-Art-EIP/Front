export interface IUser {
  id: string;
  username: string;
  email: string;
  is_artist: boolean;
  availability: "available" | "unavailable";
  subscription: string;
  collections: string[];
}

export interface IConnectedUser {
  token: string;
  user: IUser;
}
