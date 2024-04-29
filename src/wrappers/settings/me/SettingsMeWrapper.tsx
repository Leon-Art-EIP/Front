"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Fetcher from "../../../components/fetch/Fetcher";
import TitledLabel from "../../../components/label/TitledLabel";
import Button from "../../../components/lib/Button/Button";
import LoadingPage from "../../../components/loading/LoadingPage";
import { IConnectedUser } from "../../../interfaces/user/user";

export default function SettingsMeWrapper(): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") ?? "{}");
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "no_key_provided");
  const [nbFetchsStripeAccountLink, setNbFetchsStripeAccountLink] = useState(0);
  const [nbFetchsStripeAccountAlreadyLinked, setNbFetchsStripeAccountAlreadyLinked] = useState(0);
  const [stripeAccountAlreadyLinked, setStripeAccountAlreadyLinked] = useState(false);

  function getStripeAccountLink() {
    setNbFetchsStripeAccountLink(nbFetchsStripeAccountLink + 1);
  }

  function handleCreateStipeAccount(json: any) {
    const data = json;

    if (data.url) {
      // Redirect to the Stripe account link page
      window.location.href = data.url;
    }
  }

  function handleStipeAccountAlreadyLinked(json: any) {
    const data = json;

    if (data.linked) {
      setStripeAccountAlreadyLinked(data.linked);
    }
  }

  function isStripeAccountAlreadyLinked() {
    setNbFetchsStripeAccountAlreadyLinked(nbFetchsStripeAccountAlreadyLinked + 1);
  }

  useEffect(() => {
    isStripeAccountAlreadyLinked();
  }, []);

  function goToQuizz() {
    // Redirect to the quizz page
    window.location.href = "/quizz";
  }

  const numberOfElements = Object.keys(user).length;
  if (numberOfElements === 0) return <LoadingPage />;

  return (
    <>
      <Fetcher
        route={"/api/stripe/account-link"}
        method="POST"
        nbFetchs={nbFetchsStripeAccountLink}
        handleOk={handleCreateStipeAccount}
      />
      <Fetcher
        route={"/api/stripe/account-link-status"}
        method="GET"
        nbFetchs={nbFetchsStripeAccountAlreadyLinked}
        handleOk={handleStipeAccountAlreadyLinked}
      />
      <div className="px-24 flex flex-col gap-8">
        <TitledLabel title="Adresse mail" text={user.user.email} underline />
        <div className="flex flex-col gap-4">
          <TitledLabel
            title="Compte Stripe"
            text={stripeAccountAlreadyLinked ? "Compte stripe connecté" : "Vous n'avez pas de compte stripe connecté."}
          />
          {!stripeAccountAlreadyLinked && (
            <Button color="primary" type="button" onClick={getStripeAccountLink} className="w-fit">
              Créer ou connecter un compte Stripe
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <TitledLabel title="Type de compte" text={user.user.subscription} capitalize />
          {user.user.subscription === "standard" && (
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-xs text-tertiary">
                Vous êtes un utilisateur sans type pour l&apos;instant
              </div>
              <Button color="primary" type="button" className="w-fit" onClick={goToQuizz}>
                Passer le quizz
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
