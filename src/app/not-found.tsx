"use client";

import { useRouter } from "next/navigation";
import DisconnectButton from "../components/buttons/DisconnectButton";
import { Button } from "../components/lib";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-8 rounded p-8 bg-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-center">404 - Page introuvable</h1>
          <div className="text-2xl text-cyan-600 rounded text-center">
            Oh oh... Il semble que la page à laquelle vous essayez d&apos;accéder n&apos;existe pas
          </div>
          <div className="text-2xl text-cyan-600 rounded text-center">
            Mais pas de panique, vous pouvez revenir en lieu sûr
          </div>
        </div>
        <div className="flex flex-col gap-2 self-center">
          <Button onClick={() => router.push("/")} type="button" color="info">
            Accueil
          </Button>
          <Button onClick={() => router.back()} type="button" color="success">
            Retour
          </Button>
          <DisconnectButton />
        </div>
      </div>
    </div>
  );
}
