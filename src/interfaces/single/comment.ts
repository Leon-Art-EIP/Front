export interface IComment {
  userId: string;
  artPublicationId: string;
  text: string;
  createdAt: string;
  parentCommentId: string | null;
  likes: string[];
  id: string;
  nestedComments: Omit<IComment, "nestedComments">[];
}

export interface INewComment {
  msg: string;
  comment: Omit<IComment, "nestedComments">;
}

export interface IDisplayComment {
  id: string;
  profilePicture: string;
  username: string;
  authorId: string;
  text: string;
  createdAt: string;
  nestedComments: Omit<IComment, "nestedComments">[] | undefined;
  likes: string[];
}

export interface ILikeComment {
  msg: string;
  likeStatus: {
    commentId: string;
    isLiked: boolean;
    totalLikes: number;
  };
}
