/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Fetcher from "../../../components/fetch/Fetcher";
import TitledLabel from "../../../components/label/TitledLabel";
import LoadingPage from "../../../components/loading/LoadingPage";
import { IConnectedUser } from "../../../interfaces/user/user";
import { myFetch } from "../../../tools/myFetch";
import SocialMediaLinksForm, { SocialMediaLinks } from "../../../components/socialMediaLinks/SocialMediaLinksForm";
import { IProfileUser } from "../../../interfaces/user/profileUser";

export default function SettingsMeWrapper(): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [userProfile, setUserProfile] = useState<IProfileUser>();
  const [nbFetchsStripeAccountLink, setNbFetchsStripeAccountLink] = useState(0);
  const [stripeAccountAlreadyLinked, setStripeAccountAlreadyLinked] = useState(false);
  const [socialMediaLinkUpdatedSuccessfully, setSocialMediaLinkUpdatedSuccessfully] = useState<string>();
  const [socialMediaLinkUpdateFailed, setSocialMediaLinkUpdateFailed] = useState<string>();

  const [usernameInputValue, setUsernameInputValue] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameConflict, setUsernameConflict] = useState<boolean>(false);
  const [usernameSuccess, setUsernameSuccess] = useState<string | null>(null);

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
      const artist = response.json as IProfileUser;
      setUserProfile(artist);
    }

    async function fetchStripeAccountLinked() {
      const response = await myFetch({ route: "/api/stripe/account-link-status", method: "GET" });
      const data = response.json;
      if (data && data.linked) {
        setStripeAccountAlreadyLinked(data.linked);
      }
    }

    fetchUserProfileData();
    fetchStripeAccountLinked();
  }, [user.user.id]);

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
      setUserProfile(response.json as IProfileUser);
      setSocialMediaLinkUpdatedSuccessfully("Vos liens ont été mis à jour avec succès.");
      setSocialMediaLinkUpdateFailed(undefined);
    } else {
      setSocialMediaLinkUpdateFailed("Une erreur est survenue lors de la mise à jour de vos liens.");
      setSocialMediaLinkUpdatedSuccessfully(undefined);
    }
  }

  const handleOnUsernemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInputValue(event.target.value);
  };

  const handleUsernameBlur = async () => {
    if (usernameInputValue) {
      try {
        const res = await myFetch({
          route: `/api/user/check-username/${usernameInputValue}`,
          method: "GET",
        });

        if (res.status === 409 || res.json.exists) {
          setUsernameConflict(true);
          setUsernameError("Nom d'utilisateur déjà pris.");
        } else {
          setUsernameConflict(false);
          setUsernameError(null);
        }
      } catch (error) {
        console.error("Network error:", error);
        setUsernameError("Erreur de réseau. Veuillez réessayer.");
        setUsernameConflict(false);
      }
    }
  };

  const resetUsernameError = () => {
    setUsernameError(null);
    setUsernameConflict(false);
  };

  const handleOnUsernameModify = async () => {
    console.log("Enter handleOnUsernameModify");
    if (usernameConflict || !usernameInputValue) return;
    console.log("No error detected");
    try {
      const response = await myFetch({
        route: `/api/user/profile/username`,
        method: "POST",
        body: JSON.stringify({ username: usernameInputValue }),
      });

      if (response.ok) {
        setUserProfile((prevProfile) => prevProfile && { ...prevProfile, username: usernameInputValue });
        setUsernameSuccess("Nom d'utilisateur mis à jour avec succès."); // Set success message
        setUsernameError(null); // Clear any existing error
      } else {
        setUsernameError("Erreur lors de la mise à jour du nom d'utilisateur.");
        setUsernameSuccess(null); // Clear success message
      }
    } catch (error) {
      console.error("Network error:", error);
      setUsernameError("Erreur de réseau. Veuillez réessayer.");
      setUsernameSuccess(null); // Clear success message
    }
    console.log("API called");
  };

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
        <div className="flex flex-col gap-4 font-semibold text-lg text-tertiary">
          <div>Nom d&apos;utilisateur</div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={usernameInputValue}
              onChange={handleOnUsernemeChange}
              onBlur={handleUsernameBlur}
              onFocus={resetUsernameError}
              className="px-4 text-secondary-tertiary font-normal border rounded-md"
              placeholder={user.user.username}
            />
            <button
              type="button"
              className={`inline-flex justify-center py-2 px-4 border border-transparent w-fit shadow-sm text-sm font-medium rounded-md text-white ${
                usernameInputValue && !usernameConflict ? "bg-primary hover:bg-primaryHover" : "bg-secondary"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
              onClick={handleOnUsernameModify}
              disabled={!usernameInputValue || usernameConflict}
            >
              Modifier
            </button>
          </div>
          {usernameConflict && usernameError && (
            <div className="text-primary text-sm mt-1" style={{ color: "red" }}>
              {usernameError}
            </div>
          )}
          {usernameSuccess && (
            <div className="text-primary text-sm mt-1" style={{ color: "green" }}>
              {usernameSuccess}
            </div>
          )}
        </div>

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
