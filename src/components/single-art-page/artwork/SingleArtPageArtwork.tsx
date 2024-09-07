import { BookmarkBorder, DeleteOutline, Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import { ElementType, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { imageApi } from "../../../tools/variables";
import { Button, Modal } from "../../lib";
import IconButton from "./IconButton";
import ShareModal from "./ShareModal";

interface ISingleArtPageArtworkProps {
  art: string;
  artId: string;
  profile: string;
  artisteName: string;
  artistId: string;
  connectedUserId: string;
  title: string;
  liked: boolean;
  nbrLikes: number;
  bookmarkOnClick(): void;
  heartOnClick(): void;
  deleteOnClick(): void;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SingleArtPageArtwork({ link: Link, ...props }: ISingleArtPageArtworkProps): JSX.Element {
  const [isImageLightboxOpen, setImageLightboxOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  function onCloseLightbox() {
    setImageLightboxOpen(false);
  }

  function onOpenLightbox() {
    setImageLightboxOpen(true);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteOnClick = () => {
    props.deleteOnClick();
    closeModal();
  };

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Êtes-vous sûr(e) de vouloir supprimer cette oeuvre ?</h1>
          <div className="flex gap-4 items-center justify-center">
            <Button onClick={closeModal} color="secondary" type="button">
              Annuler
            </Button>
            <Button onClick={deleteOnClick} color="danger" type="button">
              Oui
            </Button>
          </div>
        </div>
      </Modal>
      <ShareModal closeModal={closeShareModal} id={props.artId} isOpen={isShareModalOpen} />
      <div className="flex flex-col gap-5 w-full">
        <img
          src={`${imageApi}/${props.art}`}
          alt={props.title}
          className="w-full cursor-zoom-in rounded-2xl"
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
          <div className="text-tertiary flex flex-1 font-bold text-3xl">{props.title}</div>
          <div className="inline-flex gap-4 items-center">
            <IconButton
              id="share-button"
              icon={Share}
              backgroundColor="bg-background-hl"
              onClick={openShareModal}
              iconColor="text-tertiary"
              className="flex gap-4 px-6 py-2.5"
            />
            {props.artistId === props.connectedUserId && (
              <IconButton
                id="delete-button"
                icon={DeleteOutline}
                backgroundColor="bg-background-hl"
                onClick={openModal}
                iconColor="tertiary"
                className="flex gap-4 px-6 py-2.5"
              />
            )}
            <IconButton
              id="bookmark-button"
              icon={BookmarkBorder}
              backgroundColor="bg-background-hl"
              onClick={props.bookmarkOnClick}
              iconColor="text-tertiary"
              className="flex gap-4 px-6 py-2.5"
            />
            <IconButton
              id="like-button"
              icon={props.liked ? Favorite : FavoriteBorder}
              text={props.nbrLikes.toString()}
              backgroundColor="bg-background-hl"
              onClick={props.heartOnClick}
              iconColor={props.liked ? "text-primary" : "text-tertiary"}
              className="flex gap-4 px-6 py-2.5"
            />
          </div>
        </div>
        <div>
          <Link
            href={`/profile/${props.artistId}`}
            className="text-tertiary inline-flex items-center gap-5 hover:bg-secondaryGrey rounded-3xl px-4 py-2 cursor-pointer"
          >
            <>
              <img src={props.profile} alt="profile" className="rounded-3xl w-11 h-11" />
              {props.artisteName}
            </>
          </Link>
        </div>
      </div>
    </>
  );
}
