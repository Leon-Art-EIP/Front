export interface INewPost {
  msg: string;
  post: {
    userId: string;
    text: string;
    artPublicationId: string;
    likes: string[];
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
  likes: string[];
  createdAt: string;
  __v: number;
}

export interface ILikePost {
  msg: string;
  likeStatus: {
    postId: string;
    isLiked: boolean;
    totalLikes: number;
  };
}
