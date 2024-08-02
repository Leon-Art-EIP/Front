export interface IArticle {
  id: string;
  title: string;
  mainImage: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
}
