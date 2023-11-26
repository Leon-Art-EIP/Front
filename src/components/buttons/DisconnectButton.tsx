"use client";

import { useRouter } from "next/navigation";
import { Button } from "../lib";

export default function DisconnectButton(): JSX.Element {
  const router = useRouter();

  const handleOnClick = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <Button color="danger" onClick={handleOnClick}>
      Se déconnecter
    </Button>
  );
}
