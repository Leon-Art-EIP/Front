import { IArtPublication } from "../artPublication/artPublication";

export interface ICreateCollection {
  artPublicationId: string;
  collectionName: string;
  isPublic: boolean;
}

export interface ICollection {
  _id: string;
  name: string;
  user: string; // id
  __v?: number;
  artPublications: string[]; // id
  isPublic: boolean;
}

export interface ICollectionArtsExtended extends Omit<ICollection, "artPublications"> {
  artPublications: IArtPublication[];
}
