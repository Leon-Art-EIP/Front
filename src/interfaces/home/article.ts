export interface IArticle {
  _id: string;
  title: string;
  mainImage: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
}
