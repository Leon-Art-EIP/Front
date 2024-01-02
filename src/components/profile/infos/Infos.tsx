import AvailableForCommandsButton from "../../../wrappers/profile/AvailableForCommandsButton";
import InfosButtonsWrapper from "../../../wrappers/profile/InfosButtonsWrapper";
import Category, { TCategory } from "../category/Category";

export interface IInfosProps {
  availability: "available" | "unavailable";
  artistName: string;
  artType: string;
  numberOfFollowers: number;
  numberOfPosts: number;
  categories: TCategory[];
}

export default function Infos(props: IInfosProps): JSX.Element {
  const kfollowers =
    props.numberOfFollowers > 1000
      ? props.numberOfFollowers > 1000000
        ? `${Math.floor(props.numberOfFollowers / 100000) / 10}M`
        : `${Math.floor(props.numberOfFollowers / 100) / 10}k`
      : props.numberOfFollowers;

  return (
    <div className="flex items-start w-3/4 h-full bg-gradient-to-b from-secondaryGrey">
      <div className="p-4 inline-flex flex-col gap-3 justify-center">
        <div className="font-medium text-2xl text-center">{props.artistName}</div>
        <div className="inline-flex justify-center">
          <div className="bg-[#4E4E4E] rounded-2xl font-semibold px-4 py-1 text-sm text-center text-white">
            {props.artType}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-col flex flex-1 text-center gap-2">
            <div className="font-medium text-xl">{kfollowers}</div>
            <div>followers</div>
          </div>
          <div className="flex flex-col flex-1 text-center gap-2">
            <div className="font-medium text-xl">{props.numberOfPosts}</div>
            <div>posts</div>
          </div>
        </div>
        <InfosButtonsWrapper />
        {props.availability === "available" && <AvailableForCommandsButton />}
        <div className="h-0.5 w-full bg-black" />
        <div className="flex gap-2 flex-wrap">
          {props.categories.map((category) => (
            <Category category={category} key={`buttonCategory-${category}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
