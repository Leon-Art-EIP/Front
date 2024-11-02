"use client";

import { Google } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { Modal } from "../../components/lib";
import { auth } from "../../configs/firebase/firebase.config";
import { IConnectedUser } from "../../interfaces/user/user";
import { myFetch } from "../../tools/myFetch";
import { TRegisterData } from "../../zod";
import useRegisterForm from "../methods/useRegisterForm";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RegisterForm(): JSX.Element {
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");
  const methods = useRegisterForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalConditionsModal, setGeneralConditionsModal] = useState<boolean>(false);
  const [generalConditionsText, setGeneralConditionsText] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameConflict, setUsernameConflict] = useState<boolean>(false);
  const [conscentError, setConscentError] = useState<boolean>(false);
  const [conscent, setConscent] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleToggleDeliveryHelpModal() {
    setGeneralConditionsModal(!generalConditionsModal);
  }

  async function fetchGeneralConditions() {
    const res = await myFetch({ route: `/api/conditions`, method: "GET" });
    if (res.ok) {
      const data = res.json;
      setGeneralConditionsText(data.conditions);
    }
  }

  useEffect(() => {
    fetchGeneralConditions();
  }, []);

  const handleOk = async (json: any) => {
    const data = json as IConnectedUser;
    console.log("checking token");
    if ("token" in data) {
      console.log("Token is IN DATA");
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/quizz");
    }
  };

  const handleSubmit = async (formData: TRegisterData) => {
    setBody(
      JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        is_artist: true,
      })
    );
    setNbFetchs(nbFetchs + 1);
  };

  const onSubmit = async (data: TRegisterData): Promise<void> => {
    if (!conscent) {
      setConscentError(true);
      return;
    }
    await handleSubmit(data);
  };

  const handleGoogle = () => {
    window.location.href = `${NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  const handleUsernameBlur = async () => {
    const { getValues } = methods;
    const username = getValues("username");

    if (username) {
      try {
        const res = await myFetch({
          route: `/api/user/check-username/${username}`,
          method: "GET",
        });

        if (res.status === 409) {
          // If the status is 409, set the conflict flag and error message
          setUsernameConflict(true);
          setUsernameError("Nom d'utilisateur déjà pris.");
        } else {
          // Handle other statuses or successful responses
          if (res.json.exists) {
            setUsernameConflict(true);
            setUsernameError("Nom d'utilisateur déjà pris.");
          } else {
            setUsernameConflict(false);
            setUsernameError(null);
          }
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

  const onChangeConscent = () => {
    setConscent(!conscent);
    if (conscentError) {
      setConscentError(false);
    }
  }

  return (
    <>
      <Fetcher
        method="POST"
        route="/api/auth/signup"
        body={body}
        nbFetchs={nbFetchs}
        handleOk={handleOk}
        successStr="Inscription réussie."
        setIsLoading={setIsLoading}
      />
      {generalConditionsModal && (
        <Modal handleClose={handleToggleDeliveryHelpModal} isOpen={generalConditionsModal}>
          <div className="flex flex-col justify-start gap-5">
            <div className="flex flex-row justify-between">
              <span className="text-2xl underline">Conditions Générales de Vente</span>
              <button onClick={handleToggleDeliveryHelpModal}>
                <CloseIcon />
              </button>
            </div>
            {generalConditionsText ? (
              <div className="text-tertiary text-md whitespace-pre max-h-[500px] overflow-y-auto">
                {generalConditionsText}
              </div>
            ) : (
              <div className="text-tertiary text-sm">Chargement des conditions générales de vente...</div>
            )}
          </div>
        </Modal>
      )}
      <FormProvider {...methods}>
        <form
          className="text-tertiary flex flex-col gap-6 w-full mt-6 md:mt-14 xl:mt-24"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="username"
            className="rounded-[30px] shadow-md bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-tertiary-hover placeholder-tertiary-hover"
            placeholder="Nom d'utilisateur"
            onBlur={handleUsernameBlur}
            onFocus={resetUsernameError}
          />
          {usernameConflict && usernameError && (
            // eslint-disable-next-line react/no-unescaped-entities
            <div className="text-primary text-sm">{usernameError}</div>
          )}
          <Input
            type="email"
            name="email"
            className="rounded-[30px] shadow-md bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-tertiary-hover placeholder-tertiary-hover"
            placeholder="Adresse email"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              className="rounded-[30px] shadow-md bg-background-inputfield text-tertiary py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-tertiary-hover placeholder-tertiary-hover"
              placeholder="Mot de passe"
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <div className="flex flex-row gap-2 justify-start">
            <input type="checkbox" name="conscent" className="m-1" onChange={onChangeConscent}/>
            <label htmlFor="terms" className="text-sm font-normal w-11/12">
              En vous enregistrant, vous acceptez les
              <span
                className="ms-1 font-bold text-primary cursor-pointer hover:underline"
                onClick={handleToggleDeliveryHelpModal}
              >
                {" "}
                Conditions Générales de Vente
              </span>
            </label>
          </div>
          {conscentError && <div className="text-primary text-sm">Veuillez accepter les conditions générales de vente.</div>}
          <div className="flex flex-col gap-2 justify-center mt-5 ">
            <button
              type="submit"
              className="py-3 rounded-[30px]  font-bold shadow-lg bg-primary text-white w-full hover:bg-primary-hover disabled:bg-primary-disabled"
              disabled={isLoading}
              name="register"
            >
              S{"'"}inscrire
            </button>
            <div className="flex flex-row items-center">
              <span className="bg-tertiary w-full rounded-full h-[2px]" />
              <span className="text-tertiary font-medium px-6">Ou</span>
              <span className="bg-tertiary w-full rounded-full h-[2px]" />
            </div>
            <button
              type="button"
              className="py-3 rounded-[30px] font-semibold shadow-lg bg-secondary text-teritary w-full hover:bg-secondary-hover disabled:bg-secondary-disabled"
              disabled={isLoading}
              name="register"
              onClick={handleGoogle}
            >
              <Google className="mr-2" style={{ marginTop: "-4px" }} />
              S&apos;enregistrer avec Google
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
