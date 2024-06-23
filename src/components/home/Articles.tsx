"use client";

import { useRouter } from "next/navigation";
import { Button } from "../lib";

export default function Articles(): JSX.Element {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/articles");
  };

  return (
    <Button color="danger" type="button" onClick={handleOnClick}>
      Tout les articles
    </Button>
  );
}
