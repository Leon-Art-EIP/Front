export interface IProfileArt {
  id: string;
  src: string;
}

export interface IProfileCollection {
  id: string;
  title: string;
  pictures: IProfileArt[];
}
