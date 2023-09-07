import { useState } from "react";
import SingleArtPageArtwork from "./artwork/SingleArtPageArtwork";
import SingleArtPageCard from "./card/SingleArtPageCard";
import { Modal } from "../lib/lib";
import SaveGallery from "./artwork/SaveGallery";
import { TCollection } from "./artwork/Collections";

export interface ISingleArtPageProps {
  description: string;
  caracteristics: string;
  price: number;
  art: string;
  profile: string;
  title: string;
  liked: boolean;
  nbrLikes: number;
  collections: TCollection[];
}

export default function SingleArtPage(props: ISingleArtPageProps): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLiked, setLiked] = useState(props.liked);
  let nbrLikes = props.nbrLikes;

  if (props.liked && !isLiked) {
    nbrLikes -= 1;
  } else if (!props.liked && isLiked) {
    nbrLikes += 1;
  }

  const bookmarkOnClick = () => {
    console.log("bookmark click");
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const heartOnClick = () => {
    console.log("J'ai aimé cette publication (envoyer +1 j'aime dans le back)"); // TODO
    setLiked(!isLiked);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} children={<SaveGallery collections={props.collections} />} handleClose={closeModal} />
      <div className="flex p-20 gap-8">
        <SingleArtPageArtwork
          art={props.art}
          profile={props.profile}
          title={props.title}
          liked={isLiked}
          nbrLikes={nbrLikes}
          bookmarkOnClick={bookmarkOnClick}
          heartOnClick={heartOnClick}
        />
        <SingleArtPageCard caracteristics={props.caracteristics} description={props.description} price={props.price} />
      </div>
    </>
  );
}
