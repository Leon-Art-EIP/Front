"use client";

import Link from "next/link";
import TitledLabel from "../../../components/label/TitledLabel";
import LoadingPage from "../../../components/loading/LoadingPage";
import { IConnectedUser } from "../../../interfaces/user/user";

export default function SettingsMeWrapper(): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  const numberOfElements = Object.keys(user).length;
  if (numberOfElements === 0) return <LoadingPage />;

  return (
    <div className="px-24 flex flex-col gap-8">
      <TitledLabel title="Adresse mail" text={user.user.email} underline />
      <div className="flex flex-col gap-4">
        <TitledLabel title="Type de compte" text={user.user.subscription} capitalize />
        {user.user.subscription === "standard" && (
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-xs text-tertiary">
              Vous êtes un utilisateur sans type pour l&apos;instant
            </div>
            <Link
              href="/quizz"
              className="self-start rounded-lg py-1 px-5 text-base font-semibold cursor-pointer transition-colors duration-300 ease-in-out bg-red-600 text-white hover:bg-red-700"
            >
              Passer le quizz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
