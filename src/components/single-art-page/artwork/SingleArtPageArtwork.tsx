import Image from "next/image";
import IconButton from "./IconButton";
import { BookmarkBorder, Favorite, FavoriteBorder } from "@mui/icons-material";
import { ElementType, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

interface ISingleArtPageArtworkProps {
  art: string;
  profile: string;
  artisteName: string;
  artistId: string;
  title: string;
  liked: boolean;
  nbrLikes: number;
  bookmarkOnClick(): void;
  heartOnClick(): void;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SingleArtPageArtwork({ link: Link, ...props }: ISingleArtPageArtworkProps): JSX.Element {
  const [isImageLightboxOpen, setImageLightboxOpen] = useState(false);

  function onCloseLightbox() {
    setImageLightboxOpen(false);
  }

  function onOpenLightbox() {
    setImageLightboxOpen(true);
  }

  return (
    <div className="flex flex-col gap-5 w-3/4">
      <img
        src={`${NEXT_PUBLIC_BACKEND_URL}/api/${props.art}`}
        alt={props.title}
        className="w-full cursor-zoom-in"
        onClick={onOpenLightbox}
      />
      <Lightbox
        open={isImageLightboxOpen}
        close={onCloseLightbox}
        plugins={[Zoom, Fullscreen]}
        zoom={{
          maxZoomPixelRatio: 3,
        }}
        slides={[
          {
            src: `${NEXT_PUBLIC_BACKEND_URL}/api/${props.art}`,
            alt: `${props.title}`,
          },
        ]}
        // used to hide the navigation buttons when there is only one slide
        render={{
          iconPrev: () => <></>,
          iconNext: () => <></>,
        }}
      />
      <div className="flex">
        <div className="flex flex-1 font-bold text-3xl">{props.title}</div>
        <div className="inline-flex gap-4 items-center">
          <IconButton
            id="bookmark-button"
            icon={BookmarkBorder}
            backgroundColor="grey"
            onClick={props.bookmarkOnClick}
            color="black"
          />
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
            <img src={props.profile} alt="profile" width={40} height={44} className="rounded-3xl" />
            {props.artisteName}
          </>
        </Link>
      </div>
    </div>
  );
}
