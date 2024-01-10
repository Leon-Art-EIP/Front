export interface IUsers {
  users: IUser[];
}

export interface IUser {
  _id: number;
  username: string;
  email: string;
  is_artist: string;
  availability: string;
  subscription: string;
  subscribersCount: number
  canPostArticles: boolean;
  profilePicture: string;
}