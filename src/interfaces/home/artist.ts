export interface IArtist {
  id: string;
  username: string;
  email: string;
  is_artist: boolean;
  availability: "available" | "unavailable";
  subscription: string;
  collections: string[]; // id of collections
  subscriptions: string[];
  subscribers: string[];
  subscribersCount: number;
  likedPublications: string[];
  canPostArticles: boolean;
  profilePicture: string;
  bannerPicture: string;
  biography?: string;
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}
