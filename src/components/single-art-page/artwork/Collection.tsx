import { ICollectionArtsExtended } from "../../../interfaces/single/collection";
import Image from "next/image";
import { imageApi } from "../../../tools/variables";
import { cn } from "../../../tools/cn";

interface ICollectionProps {
  collection: ICollectionArtsExtended;
  handleSelectCollection(id: string): void;
  selected: boolean;
}

export default function Collection(props: ICollectionProps): JSX.Element {
  const artSources = props.collection.artPublications.map((art) => art.image);
  const firstPair: string[] = [];
  if (artSources.length > 0) firstPair.push(artSources[0]);
  if (artSources.length > 1) firstPair.push(artSources[1]);
  const secondPair: string[] = [];
  if (artSources.length > 2) secondPair.push(artSources[2]);
  if (artSources.length > 3) secondPair.push(artSources[3]);

  const pairs = [];
  if (firstPair.length > 0) pairs.push(firstPair);
  if (secondPair.length > 0) pairs.push(secondPair);

  const handleOnClick = () => {
    props.handleSelectCollection(props.collection._id);
  };

  return (
    <button
      className={cn(
        "flex flex-col items-center p-2 rounded-xl hover:cursor-pointer gap-2 border-4",
        props.selected ? "border-blue-300 bg-gray-300" : "hover:bg-secondaryGrey border-white"
      )}
      onClick={handleOnClick}
    >
      <div className="flex flex-col rounded-xl overflow-hidden w-48 h-48 bg-gray-300">
        {pairs.map((pair, pairIndex) => (
          <div key={`pair-${pairIndex}`} className="flex flex-wrap overflow-hidden flex-1">
            {pair.map((image, imageIndex) => (
              <Image
                key={`pair-${pairIndex}-image-${imageIndex}`}
                alt={`collection-picture-${pairIndex}-${imageIndex}`}
                src={`${imageApi}/${image}`}
                width={192}
                height={192}
                className="overflow-hidden flex-1"
              />
            ))}
          </div>
        ))}
        {artSources.length === 2 && <div className="flex-1 bg-gray-300" />}
      </div>
      <div className="text-2xl font-semibold">{props.collection.name}</div>
    </button>
  );
}
