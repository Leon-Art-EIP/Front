"use client";

import { useRouter } from "next/navigation";
import { ElementType, useEffect, useState } from "react";
import { ICollectionArtsExtended } from "../../interfaces/single/collection";
import { IConnectedUser } from "../../interfaces/user/user";
import { myFetch } from "../../tools/myFetch";
import Fetcher from "../fetch/Fetcher";
import { Button, Modal } from "../lib";
import SaveGallery from "./artwork/SaveGallery";
import SingleArtPageArtwork from "./artwork/SingleArtPageArtwork";
import SingleArtPageCard from "./card/SingleArtPageCard";
import SingleArtPageComments from "./comment/SingleArtPageComments";

export interface ISingleArtPageProps {
  description: string;
  caracteristics: string;
  price?: number;
  art: string;
  artId: string;
  profile: string;
  artistName: string;
  artistId: string;
  title: string;
  liked: boolean;
  nbrLikes: number;
  collections: ICollectionArtsExtended[];
  belongingCollectionsIds: string[];
  belongingCommands: boolean;
  link: ElementType<{ children: JSX.Element; href: string }>; // Car Storybook ne supporte pas le Link de Next
  paymentSuccessful: boolean;
  paymentCanceled: boolean;
  connectedUserId: string;
}

export default function SingleArtPage(props: ISingleArtPageProps): JSX.Element {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLiked, setLiked] = useState(props.liked);
  const [selectedCollections, setSelectedCollections] = useState<string[]>(props.belongingCollectionsIds);
  const [currentUser, setCurrentUser] = useState<IConnectedUser>();
  const [nbFetchs, setNbFetchs] = useState(0);

  useEffect(() => {
    async function getCurrentUser() {
      if (!localStorage.getItem("user")) {
        router.push("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user") || "{}"));
      }
    }
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let nbrLikes = props.nbrLikes;

  if (props.liked && !isLiked) {
    nbrLikes -= 1;
  } else if (!props.liked && isLiked) {
    nbrLikes += 1;
  }

  const bookmarkOnClick = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    setLiked(!isLiked);
  };

  const heartOnClick = () => {
    setNbFetchs(nbFetchs + 1);
  };

  async function onSendMessage() {
    const response = await myFetch({
      route: `/api/conversations/create`,
      method: "PUT",
      body: JSON.stringify({
        UserOneId: props.artistId,
        UserTwoId: currentUser?.user.id,
      }),
    });
    const data = response.json;
    if (response.ok) {
      router.push(`/chat/${data.convId}`);
    }
  }

  return (
    <>
      <Fetcher
        route={`/api/art-publication/like/${props.artId}`}
        method="POST"
        nbFetchs={nbFetchs}
        handleOk={handleOk}
      />
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <SaveGallery
          collections={props.collections}
          handleClose={closeModal}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          artId={props.artId}
        />
      </Modal>
      <div className="flex px-20 py-10 gap-8 flex-wrap lg:flex-nowrap">
        <div className="w-3/4 flex flex-col gap-8 justify-center">
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
          <SingleArtPageComments id={props.artId} connectedUserId={props.connectedUserId} />
        </div>

        <div className="flex flex-col gap-4 w-1/4">
          <SingleArtPageCard
            artPublicationId={props.artId}
            caracteristics={props.caracteristics}
            description={props.description}
            price={props.price}
            link={props.link}
            belongingCommands={props.belongingCommands}
            paymentSuccessful={props.paymentSuccessful}
            paymentCanceled={props.paymentCanceled}
          />
          <Button color="primary" type="button" onClick={onSendMessage}>
            Envoyer un message
          </Button>
        </div>
      </div>
    </>
  );
}
