export interface IComment {
  id: string;
  userId: string;
  artPublicationId: string;
  text: string;
  createdAt: string;
}

export interface IDisplayComment {
  id: string;
  profilePicture: string;
  username: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface IAddComment {
  msg: string;
  comment: Omit<IComment, "id"> & {
    id: string;
  };
}
