import Image from "next/image";
import IconButton from "./IconButton";
import { BookmarkBorder, Favorite } from "@mui/icons-material";

interface ISingleArtPageArtworkProps {
  art: string;
  profile: string;
  title: string;
  nbrLikes: number;
  bookmarkOnClick(): void;
  heartOnClick(): void;
}

export default function SingleArtPageArtwork(props: ISingleArtPageArtworkProps): JSX.Element {
  return (
    <div className="flex flex-col gap-5">
      <Image src={props.art} alt="art" width={900} height={500} className="rounded-2xl" />
      <div className="flex">
        <div className="flex flex-1 font-bold text-3xl">{props.title}</div>
        <div className="flex gap-4">
          <IconButton icon={BookmarkBorder} backgroundColor="grey" onClick={props.bookmarkOnClick} />
          <IconButton
            icon={Favorite}
            text={props.nbrLikes.toString()}
            backgroundColor="black"
            onClick={props.heartOnClick}
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Image src={props.profile} alt="profile" width={40} height={44} className="rounded-3xl" />
        Rosalia Parker
      </div>
    </div>
  );
}
