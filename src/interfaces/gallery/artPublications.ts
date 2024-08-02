export interface IArtPublications {
  artPublications: IArtPublication[];
}

export interface IArtPublication {
  id: string;
  name: string;
  artType: string;
  image: string;
  price: number;
  isForSale: boolean;
  description: string;
}
