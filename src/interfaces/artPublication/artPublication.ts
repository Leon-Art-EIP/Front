export interface IArtPublication {
  _id: string;
  userId: string;
  image: string;
  artType: string;
  name: string;
  description: string;
  isForSale: boolean;
  isSold: boolean;
  price: number | null;
  location: string;
  likes: string[]; // id
  totalLikes: number;
  comments: string[];
}
