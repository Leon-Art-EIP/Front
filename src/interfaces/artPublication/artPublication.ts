import { IArtist } from "../home/artist";

export interface IArtPublication {
  _id: string;
  userId: string;
  image: string;
  artType: string;
  name: string;
  description: string;
  dimension: string;
  isForSale: boolean;
  price: number;
  location: string;
  likes: IArtist[];
  comments: string[];
  __v: number;
}
