"use client";

import { ElementType, useState } from "react";
import AvailableForCommandsButton from "../../../wrappers/profile/AvailableForCommandsButton";
import InfosButtonsWrapper from "../../../wrappers/profile/InfosButtonsWrapper";
import LinkButton from "../../lib/Button/LinkButton";

export interface IInfosProps {
  availability: "available" | "unavailable";
  artistName: string;
  numberOfFollowers: number;
  numberOfPosts: number;
  myProfile: boolean;
  following: boolean;
  id: string;
  connectedUserId: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

/* c8 ignore start */

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
    <div className="flex flex-col bg-gradient-to-b from-background-hl pt-4 w-72 mx-16">
      <div className="p-4 inline-flex flex-col gap-3 justify-center">
        <div className="font-medium text-2xl text-center text-tertiary">{props.artistName}</div>
        <div className="flex gap-4">
          <div className="flex-col flex flex-1 text-center gap-2 text-tertiary">
            <div className="font-medium text-xl">{kfollowers}</div>
            <div>{`follower${numberOfFollowers > 1 ? "s" : ""}`}</div>
          </div>
          <div className="flex flex-col flex-1 text-center gap-2 text-tertiary">
            <div className="font-medium text-xl">{props.numberOfPosts}</div>
            <div>posts</div>
          </div>
        </div>
        {!props.myProfile && (
          <InfosButtonsWrapper
            following={following}
            link={props.link}
            id={props.id}
            connectedUserId={props.connectedUserId}
            setFollowing={setFollowing}
          />
        )}
        <AvailableForCommandsButton isAvailable={props.availability === "available"} disabled={!props.myProfile} />
        <div className="h-0.5 w-full bg-black" />
        {props.myProfile && (
          <LinkButton link={props.link} href={`/single/new`} color="danger" type="button" className="w-fit self-center">
            Nouvelle publication
          </LinkButton>
        )}
      </div>
    </div>
  );
}

/* c8 ignore stop */
