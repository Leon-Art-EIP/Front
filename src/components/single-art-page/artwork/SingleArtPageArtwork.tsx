import Image from "next/image";
import IconButton from "./IconButton";
import { BookmarkBorder, Favorite, FavoriteBorder } from "@mui/icons-material";
import { ElementType, useState } from "react";

interface ISingleArtPageArtworkProps {
  art: string;
  profile: string;
  artisteName: string;
  artistId: number;
  title: string;
  liked: boolean;
  nbrLikes: number;
  bookmarkOnClick(): void;
  heartOnClick(): void;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function SingleArtPageArtwork({ link: Link, ...props }: ISingleArtPageArtworkProps): JSX.Element {
  return (
    <div className="flex flex-col gap-5">
      <Image src={props.art} alt="art" width={900} height={500} className="rounded-2xl" />
      <div className="flex">
        <div className="flex flex-1 font-bold text-3xl">{props.title}</div>
        <div className="inline-flex gap-4 items-center">
          <IconButton id="bookmark-button" icon={BookmarkBorder} backgroundColor="grey" onClick={props.bookmarkOnClick} color="black" />
          <IconButton
            id="like-button"
            icon={props.liked ? Favorite : FavoriteBorder}
            text={props.nbrLikes.toString()}
            backgroundColor="black"
            onClick={props.heartOnClick}
            color={props.liked ? "red" : "white"}
          />
        </div>
      </div>
      <div>
        <Link
          href={`/profile/${props.artistId}`}
          className="inline-flex items-center gap-5 hover:bg-secondaryGrey rounded-3xl px-4 py-2 cursor-pointer"
        >
          <>
            <Image src={props.profile} alt="profile" width={40} height={44} className="rounded-3xl" />
            {props.artisteName}
          </>
        </Link>
      </div>
    </div>
  );
}
