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

export interface IPost {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  text: string;
  artPublicationId?: {
    _id: string;
    name: string;
  };
  likes: number[];
  createdAt: string;
  __v: number;
}
