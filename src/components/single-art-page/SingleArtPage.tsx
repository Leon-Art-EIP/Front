"use client";

import { ElementType, useState } from "react";
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
  artId: number;
  profile: string;
  artistName: string;
  artistId: number;
  title: string;
  liked: boolean;
  nbrLikes: number;
  collections: TCollection[];
  belongingCollections: number[];
  belongingCommands: boolean;
  link: ElementType<{ children: JSX.Element; href: string }>; // Car Storybook ne supporte pas le Link de Next
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SingleArtPage(props: ISingleArtPageProps): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLiked, setLiked] = useState(props.liked);
  const [selectedCollections, setSelectedCollections] = useState<number[]>(props.belongingCollections);

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

  const fetchLikePublication = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/art-publication/like/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("Successful like request");
    } else {
      console.log("Failed with like request");
    }
  };

  const heartOnClick = () => {
    fetchLikePublication(props.artId);
    setLiked(!isLiked);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <SaveGallery
          collections={props.collections}
          handleClose={closeModal}
          belongingCollections={props.belongingCollections}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
        />
      </Modal>
      <div className="flex p-20 gap-8 flex-wrap lg:flex-nowrap">
        <SingleArtPageArtwork
          art={props.art}
          profile={props.profile}
          artisteName={props.artistName}
          artistId={props.artistId}
          title={props.title}
          liked={isLiked}
          nbrLikes={nbrLikes}
          bookmarkOnClick={bookmarkOnClick}
          heartOnClick={heartOnClick}
          link={props.link}
        />
        <SingleArtPageCard
          caracteristics={props.caracteristics}
          description={props.description}
          price={props.price}
          link={props.link}
          belongingCommands={props.belongingCommands}
        />
      </div>
    </>
  );
}
