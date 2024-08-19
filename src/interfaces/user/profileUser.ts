import { IUser } from "./user";

export interface IProfileUser extends IUser {
  _id: string;
  subscriptions: string[];
  subscribers: string[];
  subscribersCount: number;
  likedPublications: string[];
  canPostArticles: boolean;
  __v: number;
  bannerPicture: string;
  profilePicture: string;
}
