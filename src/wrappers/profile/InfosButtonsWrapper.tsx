"use client";

import { Dispatch, ElementType, SetStateAction } from "react";
import Button from "../../components/profile/Button";
import { myFetch } from "../../tools/myFetch";
import { useRouter } from "next/navigation";

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

  const handleFollow = async () => {
    const response = await myFetch({ route: `/api/follow/${props.id}`, method: "POST" });

    if (response.status === 200) {
      props.setFollowing(!props.following);
    }
  };

  async function onGoToChat() {
    const response = await myFetch({
      route: `/api/conversations/create`,
      method: "PUT",
      body: JSON.stringify({
        UserOneId: props.connectedUserId,
        UserTwoId: props.id,
      }),
    });
    const data = await response.json();
    if (response.status === 200 && "convId" in data) {
      router.push(`/chat/${data.convId}`);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button text="Contacter" className="w-full bg-white text-black" onClick={onGoToChat} />
      {props.following ? (
        <Button onClick={handleFollow} text="Ne plus suivre" className="text-black bg-gray-300" />
      ) : (
        <Button onClick={handleFollow} text="Suivre" className="text-white bg-primaryRed" />
      )}
    </div>
  );
}

/* c8 ignore stop */
