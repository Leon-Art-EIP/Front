export interface IPassingArt {
  _id: string;
  title: string;
  mainImage: string;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
  position: number;
}
