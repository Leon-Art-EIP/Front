"use client";

import { ElementType, useState } from "react";
import Button from "../../components/profile/Button";
import { props } from "cypress/types/bluebird";
import { myFetch } from "../../tools/myFetch";

interface IInfosButtonsWrapperProps {
  link: ElementType<{ children: JSX.Element; href: string }>;
  following: boolean;
  id: string;
}

export default function InfosButtonsWrapper({ link: Link, ...props }: IInfosButtonsWrapperProps): JSX.Element {
  const [following, setFollowing] = useState<boolean>(props.following);

  const handleFollow = async () => {
    const response = await myFetch({ route: `/api/follow/${props.id}`, method: "POST" });

    if (response.status === 200) {
      setFollowing(!following);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Link href="/chat">
        <Button text="Contacter" className="w-full bg-white text-black" />
      </Link>
      {following ? (
        <Button onClick={handleFollow} text="Ne plus suivre" className="text-black bg-gray-300" />
      ) : (
        <Button onClick={handleFollow} text="Suivre" className="text-white bg-primaryRed" />
      )}
    </div>
  );
}
