import { IArtPublication } from "../artPublication/artPublication";

export interface INewCollection {
  msg: string;
  collection: ICollection;
}

export interface ICollection {
  _id: string;
  name: string;
  userId: string; // id
  artPublications: string[]; // id
  isPublic: boolean;
}

export interface ICollectionArtsExtended extends Omit<ICollection, "artPublications"> {
  artPublications: IArtPublication[];
}
