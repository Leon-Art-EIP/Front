export interface INewPost {
  msg: string;
  post: {
    userId: string;
    text: string;
    artPublicationId: string;
    likes: string[];
    id: string;
    createdAt: string;
  };
  user: {
    username: string;
    profilePicture: string;
  };
}

export interface IPost {
  id: string;
  userId: {
    id: string;
    username: string;
    profilePicture: string;
  };
  text: string;
  artPublicationId?: {
    id: string;
    name: string;
  };
  likes: string[];
  createdAt: string;
}

export interface ILikePost {
  msg: string;
  likeStatus: {
    postId: string;
    isLiked: boolean;
    totalLikes: number;
  };
}
