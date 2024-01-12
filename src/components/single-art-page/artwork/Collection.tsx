import { ICollectionArtsExtended } from "../../../interfaces/single/collection";
import Image from "next/image";
import { imageApi } from "../../../tools/variables";

interface ICollectionProps {
  collection: ICollectionArtsExtended;
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

  const sizeFirstPair = firstPair.length == 1 ? 192 : 96;
  const sizeSecondPair = secondPair.length == 1 ? 192 : 96;

  return (
    <button className="flex flex-col items-center p-2 rounded-xl hover:bg-secondaryGrey hover:cursor-pointer gap-2">
      <div className="flex flex-col rounded-xl overflow-hidden">
        {pairs.map((pair, pairIndex) => (
          <div key={`pair-${pairIndex}`} className="flex flex-wrap overflow-hidden">
            {pair.map((image, imageIndex) => (
              <Image
                key={`pair-${pairIndex}-image-${imageIndex}`}
                alt={`collection-picture-${pairIndex}-${imageIndex}`}
                src={`${imageApi}/${image}`}
                width={pairIndex == 0 ? sizeFirstPair : sizeSecondPair}
                height={pairIndex == 0 ? sizeFirstPair : sizeSecondPair}
                className="overflow-hidden"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-2xl font-semibold">{props.collection.name}</div>
    </button>
  );
}
