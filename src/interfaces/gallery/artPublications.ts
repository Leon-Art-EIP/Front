export interface IArtPublications {
  artPublications: IArtPublication[];
}

export interface IArtPublication {
  _id: string;
  name: string;
  artType: string;
  image: string;
  price: number;
  isForSale: boolean;
  description: string;
}
