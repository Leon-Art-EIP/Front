import { useState } from "react";
import SingleArtPageArtwork from "./artwork/SingleArtPageArtwork";
import SingleArtPageCard from "./card/SingleArtPageCard";
import { Modal } from "../lib/lib";

export interface ISingleArtPageProps {
  description: string;
  caracteristics: string;
  price: number;
  art: string;
  profile: string;
  title: string;
  nbrLikes: number;
}

export default function SingleArtPage(props: ISingleArtPageProps): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);

  const bookmarkOnClick = () => {
    console.log("bookmark click");
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const heartOnClick = () => {
    console.log("J'ai aimé cette publication (envoyer +1 j'aime dans le back)"); // TODO
  };

  return (
    <>
      <Modal isOpen={isModalOpen} children={<div>Bonjour</div>} handleClose={closeModal} />
      <div className="flex p-20 gap-8">
        <SingleArtPageArtwork
          art={props.art}
          profile={props.profile}
          title={props.title}
          nbrLikes={props.nbrLikes}
          bookmarkOnClick={bookmarkOnClick}
          heartOnClick={heartOnClick}
        />
        <SingleArtPageCard caracteristics={props.description} description={props.description} price={props.price} />
      </div>
    </>
  );
}
