export interface INewPost {
  msg: string;
  post: {
    userId: string;
    text: string;
    artPublicationId: string | null;
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
  userId: string;
  text: string;
  artPublicationId: string | null;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  likes: string[];
  id: string;
  user: {
    username: string;
    profilePicture: string;
  };
  artPublication: {
    name: string;
  };
}

export interface ILikePost {
  msg: string;
  likeStatus: {
    postId: string;
    isLiked: boolean;
    totalLikes: number;
  };
}
