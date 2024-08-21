export type TChildComment = Omit<IComment, "nestedComments">;

export interface IComment {
  userId: string;
  artPublicationId: string;
  text: string;
  createdAt: string;
  parentCommentId: string | null;
  likes: string[];
  id: string;
  nestedComments: TChildComment[];
}

export interface INewComment {
  msg: string;
  comment: TChildComment; // nestedComments n'est pas renvoyé (même pour commentaire parent)
}

export type TChildExtendedComment = Omit<IExtendedComment, "nestedComments">;

export interface IExtendedComment {
  userId: string;
  artPublicationId: string;
  text: string;
  createdAt: string;
  parentCommentId: string | null;
  likes: string[];
  id: string;
  // Comment IComment jusqu'ici
  profilePicture: string;
  username: string;
  nestedComments: TChildExtendedComment[];
}

export interface ILikeComment {
  msg: string;
  likeStatus: {
    commentId: string;
    isLiked: boolean;
    totalLikes: number;
  };
}
