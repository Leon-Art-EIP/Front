import { ForkRight, RampRight } from "@mui/icons-material";
import Button from "../Button";
import Category from "../category/Category";
import { TCategory } from "../category/category";
import IconButton from "../IconButton";
import Chevron from "./Chevron";

export interface IInfosProps {
  artistName: string;
  artistDescription: string;
  numberOfFollowers: number;
  numberOfPosts: number;
  categories: TCategory[];
}

export default function Infos(props: IInfosProps): JSX.Element {
  const kfollowers =
    props.numberOfFollowers > 1000 ? `${Math.floor(props.numberOfFollowers / 100) / 10}k` : props.numberOfFollowers;

  return (
    <div className="h-full bg-secondaryGrey p-4 inline-flex flex-col gap-3 justify-center w-64">
      <div className="font-medium text-2xl text-center">{props.artistName}</div>
      <div className="inline-flex justify-center">
        <div className="bg-[#4E4E4E] rounded-2xl font-semibold px-4 py-1 text-sm text-center text-white">
          {props.artistDescription}
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
      <div className="flex gap-2 [&>*]:flex-1">
        <Button onClick={() => {}} text="Contacter" />
        <Button onClick={() => {}} text="Suivre" className="text-white bg-primaryRed" />
      </div>
      <IconButton onClick={() => {}} text="Ouvert aux commandes" className="text-green-500 bg-[#DDD]" icon={Chevron} />
      <div className="h-0.5 w-full bg-black" />
      <div className="flex gap-2 flex-wrap">
        {props.categories.map((category) => (
          <Category category={category} />
        ))}
      </div>
    </div>
  );
}
