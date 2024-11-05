export interface IArtPublications {
  artPublications: IArtPublication[];
}

export interface IArtPublication {
  _id: string;
  name: string;
  artType: string;
  image: string;
  price: number | null;
  isForSale: boolean;
  description: string;
}
