import Image from "next/image";
import { cn } from "../../../tools/cn";

export type TCollection = {
  id: number;
  picture: string;
  title: string;
};

export interface ICollectionsProps {
  collections: TCollection[];
  selectedCollections: number[];
  handleSelectCollection(id: number): void;
}

export default function Collections(props: ICollectionsProps): JSX.Element {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {props.collections.map((collection) => (
        <div
          key={`collection-${collection.id}`}
          id={`collection-${collection.id}`}
          className={cn(
            "flex flex-col gap-2 pb-1 px-3 pt-3 rounded-3xl cursor-pointer",
            props.selectedCollections.includes(collection.id) ? "bg-[#FF7F74] text-white" : "hover:bg-secondaryGrey"
          )}
          onClick={() => props.handleSelectCollection(collection.id)}
        >
          <Image src={collection.picture} height={250} width={250} alt="picture" className="h-64 w-64 rounded-3xl" />
          <div className="text-xl font-semibold text-center">{collection.title}</div>
        </div>
      ))}
    </div>
  );
}
