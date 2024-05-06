"use client";

import { useRouter } from "next/navigation";
import { Dispatch, ElementType, SetStateAction, useState } from "react";
import Fetcher from "../../components/fetch/Fetcher";
import Button from "../../components/profile/Button";

interface IInfosButtonsWrapperProps {
  link: ElementType<{ children: JSX.Element; href: string }>;
  id: string;
  connectedUserId: string;
  following: boolean;
  setFollowing: Dispatch<SetStateAction<boolean>>;
}

/* c8 ignore start */

export default function InfosButtonsWrapper({ link: Link, ...props }: IInfosButtonsWrapperProps): JSX.Element {
  const router = useRouter();
  const [nbFetchsFollow, setNbFetchsFollow] = useState(0);
  const [nbFetchsCreateConversations, setNbFetchsCreateConversations] = useState(0);

  const handleOkFollow = () => {
    props.setFollowing(!props.following);
  };

  const handleFollow = async () => {
    setNbFetchsFollow(nbFetchsFollow + 1);
  };

  const handleOkCreateConversations = (json: any) => {
    const data = json;

    if ("convId" in data) {
      router.push(`/chat/${data.convId}`);
    }
  };

  async function onGoToChat() {
    setNbFetchsCreateConversations(nbFetchsCreateConversations + 1);
  }

  return (
    <>
      <Fetcher route={`/api/follow/${props.id}`} method="POST" nbFetchs={nbFetchsFollow} handleOk={handleOkFollow} />
      <Fetcher
        route="/api/conversations/create"
        method="PUT"
        body={JSON.stringify({
          UserOneId: props.connectedUserId,
          UserTwoId: props.id,
        })}
        handleOk={handleOkCreateConversations}
        nbFetchs={nbFetchsCreateConversations}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button text="Contacter" className="w-full bg-white text-black" onClick={onGoToChat} />
        {props.following ? (
          <Button onClick={handleFollow} text="Ne plus suivre" className="text-black bg-gray-300" />
        ) : (
          <Button onClick={handleFollow} text="Suivre" className="text-white bg-primaryRed" />
        )}
      </div>
    </>
  );
}

/* c8 ignore stop */
