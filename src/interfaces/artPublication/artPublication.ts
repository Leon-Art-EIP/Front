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
  likes: string[];
  comments: string[],
  __v: number;
}
