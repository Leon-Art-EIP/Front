"use client";

import { ElementType, useState } from "react";
import AvailableForCommandsButton from "../../../wrappers/profile/AvailableForCommandsButton";
import InfosButtonsWrapper from "../../../wrappers/profile/InfosButtonsWrapper";
import Category, { TCategory } from "../category/Category";
import LinkButton from "../../lib/Button/LinkButton";

export interface IInfosProps {
  availability: "available" | "unavailable";
  artistName: string;
  artType: string;
  numberOfFollowers: number;
  numberOfPosts: number;
  categories: TCategory[];
  myProfile: boolean;
  following: boolean;
  id: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Infos(props: IInfosProps): JSX.Element {
  const [following, setFollowing] = useState<boolean>(props.following); // can be deleted when parent component server side
  const numberOfFollowers =
    props.numberOfFollowers + (!props.following && following ? 1 : 0) - (props.following && !following ? 1 : 0);
  const kfollowers =
    numberOfFollowers > 1000
      ? numberOfFollowers > 1000000
        ? `${Math.floor(numberOfFollowers / 100000) / 10}M`
        : `${Math.floor(numberOfFollowers / 100) / 10}k`
      : numberOfFollowers;

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
            <div>{`follower${numberOfFollowers > 1 ? "s" : ""}`}</div>
          </div>
          <div className="flex flex-col flex-1 text-center gap-2">
            <div className="font-medium text-xl">{props.numberOfPosts}</div>
            <div>posts</div>
          </div>
        </div>
        {!props.myProfile && (
          <InfosButtonsWrapper following={following} link={props.link} id={props.id} setFollowing={setFollowing} />
        )}
        {props.availability === "available" && <AvailableForCommandsButton />}
        <div className="h-0.5 w-full bg-black" />
        <div className="flex gap-2 flex-wrap">
          {props.categories.map((category) => (
            <Category category={category} key={`buttonCategory-${category}`} />
          ))}
        </div>
        {props.myProfile && (
          <LinkButton link={props.link} href={`/single/new`} color="danger" type="button" className="w-fit self-center">
            Nouvelle publication
          </LinkButton>
        )}
      </div>
    </div>
  );
}
