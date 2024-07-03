export interface INewPost {
  msg: string;
  post: {
    userId: string;
    text: string;
    artPublicationId: string;
    likes: number[];
    _id: string;
    createdAt: string;
    __v: number;
  };
}
