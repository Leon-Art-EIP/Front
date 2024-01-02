export interface IUserCollection {
  _id: string;
  name: string;
  user: string;
  __v?: number;
  artPublications: string[];
  isPublic: boolean;
}
