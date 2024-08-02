import { IArtPublication } from "../artPublication/artPublication";

export interface ICreateCollection {
  artPublicationId: string;
  collectionName: string;
  isPublic: boolean;
}

export interface ICollection {
  id: string;
  name: string;
  user: string; // id
  artPublications: string[]; // id
  isPublic: boolean;
}

export interface ICollectionArtsExtended extends Omit<ICollection, "artPublications"> {
  artPublications: IArtPublication[];
}
