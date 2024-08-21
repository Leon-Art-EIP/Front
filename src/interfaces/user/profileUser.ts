import { IUser } from "./user";

export interface IProfileUser extends IUser {
  id: string;
  subscriptions: string[];
  subscribers: string[];
  subscribersCount: number;
  likedPublications: string[];
  canPostArticles: boolean;
  bannerPicture: string;
  profilePicture: string;
}
