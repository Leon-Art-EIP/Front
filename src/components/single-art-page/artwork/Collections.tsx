import Image from "next/image";

export type TCollection = {
  id: number;
  picture: string;
  title: string;
};

export interface ICollectionsProps {
  collections: TCollection[];
}

export default function Collections(props: ICollectionsProps): JSX.Element {
  return (
    <div className="flex flex-wrap p-7 min-w-[800px]">
      {props.collections.map((collection) => (
        <div className="flex flex-col gap-1.5">
          <Image src={collection.picture} height={250} width={250} alt="picture" />
          <div className="text-xl font-semibold">{collection.title}</div>
        </div>
      ))}
    </div>
  );
}
