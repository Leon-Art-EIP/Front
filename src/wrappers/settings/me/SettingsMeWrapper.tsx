"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Fetcher from "../../../components/fetch/Fetcher";
import TitledLabel from "../../../components/label/TitledLabel";
import Button from "../../../components/lib/Button/Button";
import LoadingPage from "../../../components/loading/LoadingPage";
import { IConnectedUser } from "../../../interfaces/user/user";
import { myFetch } from "../../../tools/myFetch";
import { IArtist } from "../../../interfaces/home/artist";
import SocialMediaLinksForm, { SocialMediaLinks } from "../../../components/socialMediaLinks/SocialMediaLinksForm";

export default function SettingsMeWrapper(): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [userProfile, setUserProfile] = useState<IArtist>();
  const [nbFetchsStripeAccountLink, setNbFetchsStripeAccountLink] = useState(0);
  const [stripeAccountAlreadyLinked, setStripeAccountAlreadyLinked] = useState(false);
  const [socialMediaLinkUpdatedSuccessfully, setSocialMediaLinkUpdatedSuccessfully] = useState<string>();
  const [socialMediaLinkUpdateFailed, setSocialMediaLinkUpdateFailed] = useState<string>();

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

  useEffect(() => {
    async function fetchUserProfileData() {
      const response = await myFetch({ route: `/api/user/profile/${user.user.id}`, method: "GET" });
      const artist = response.json as IArtist;
      setUserProfile(artist);
    }

    async function fetchStripeAccountLinked() {
      const response = await myFetch({ route: "/api/stripe/account-link-status", method: "GET" });
      const data = response.json;
      console.log(response)
      if (data && data.linked) {
        setStripeAccountAlreadyLinked(data.linked);
      }
    }

    fetchUserProfileData();
    fetchStripeAccountLinked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToQuizz() {
    window.location.href = "/quizz";
  }

  async function handleSocialMediaLinksSubmit(links: SocialMediaLinks) {
    const response = await myFetch({
      route: `/api/user/profile/social-links`,
      method: "POST",
      body: JSON.stringify(links),
    });
    if (response.ok) {
      setUserProfile(response.json as IArtist);
      setSocialMediaLinkUpdatedSuccessfully("Vos liens ont été mis à jour avec succès.");
      setSocialMediaLinkUpdateFailed(undefined);
    } else {
      setSocialMediaLinkUpdateFailed("Une erreur est survenue lors de la mise à jour de vos liens.");
      setSocialMediaLinkUpdatedSuccessfully(undefined);
    }
  }

  const numberOfElements = Object.keys(user).length;
  if (numberOfElements === 0) return <LoadingPage />;

  return (
    <>
      <Fetcher
        route={"/api/stripe/account-link"}
        method="POST"
        body={JSON.stringify({ source: "web" })}
        nbFetchs={nbFetchsStripeAccountLink}
        handleOk={handleCreateStipeAccount}
      />
      <div className="flex flex-col gap-14">
        <TitledLabel title="Adresse mail" text={user.user.email} />
        <div className="flex flex-col gap-4">
          <TitledLabel
            title="Réseaux sociaux"
            text="Ajoutez les liens vers vos réseaux sociaux pour plus de visibilité."
          />
          <SocialMediaLinksForm
            initialLinks={userProfile?.socialMediaLinks}
            onSubmit={handleSocialMediaLinksSubmit}
            successMessage={socialMediaLinkUpdatedSuccessfully}
            errorMessage={socialMediaLinkUpdateFailed}
          />
        </div>
        <div className="flex flex-col gap-4">
          <TitledLabel
            title="Compte Stripe"
            text={
              stripeAccountAlreadyLinked
                ? "Un compte Stripe est connecté à votre compte Leon'Art, vous pouvez désormais vendre vos oeuvres d'arts."
                : "Aucun compte Stripe n'est connecté à votre compte Leon'Art, vous ne pouvez pas vendre vos oeuvres d'arts pour l'instant."
            }
          />
          {!stripeAccountAlreadyLinked && (
            <a
              onClick={getStripeAccountLink}
              className="text-lg italic px-4 text-secondary-tertiary font-normal hover:underline underline-offset-4 cursor-pointer"
            >
              Cliquez ici pour créer ou connecter un compte Stripe.
            </a>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <TitledLabel title="Type de compte" text={user.user.subscription} capitalize />
          {user.user.subscription === "standard" && (
            <div className="flex flex-col gap-2 px-4">
              <div className="font-normal text-lg text-tertiary">
                Vous êtes un utilisateur sans type pour l&apos;instant.
              </div>
              <a
                onClick={goToQuizz}
                className="text-lg italic text-secondary-tertiary font-normal hover:underline underline-offset-4 cursor-pointer"
              >
                Cliquez ici pour passer le quizz.
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
