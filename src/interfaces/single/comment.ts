export interface IComment {
  _id: string;
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
  comment: Omit<IComment, "_id"> & {
    id: string;
  };
}
