import { IUser } from "./user";

export interface IProfileUser extends IUser {
  subscriptions: string[];
  subscribers: string[];
  subscribersCount: number;
  likedPublications: string[];
  canPostArticles: boolean;
  bannerPicture: string;
  profilePicture: string;
  biography?: string;
  socialMediaLinks: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
  };
  location: {
    type: "Point";
    coordinates: [string, string];
  };
}
