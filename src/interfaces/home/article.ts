export interface IArticle {
  _id: string;
  title: string;
  mainImage: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}
