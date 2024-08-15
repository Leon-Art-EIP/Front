"use client";

import { useRouter } from "next/navigation";
import DisconnectButton from "../components/buttons/DisconnectButton";
import { Button } from "../components/lib";
import TextLogo from "../components/text-logo/TextLogo";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-8 rounded p-12">
        <div className="flex flex-col items-center gap-8">
          <span className="font-bold text-6xl cursor-default select-none pb-14">
            <TextLogo />
          </span>
          <h1 className="text-4xl font-bold text-center">Page introuvable</h1>
          <div className="text-xl text-center">
            Oh oh... Il semble que la page à laquelle vous essayez d&apos;accéder n&apos;existe pas.<br></br>
            Mais pas de panique, vous pouvez revenir en lieu sûr !
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <Button onClick={() => router.back()} type="button" color="secondary">
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
}
