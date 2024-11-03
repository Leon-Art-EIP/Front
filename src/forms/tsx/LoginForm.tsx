"use client";

import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { auth } from "../../configs/firebase/firebase.config";
import { IConnectedUser } from "../../interfaces/user/user";
import { TLoginData } from "../../zod";
import useLoginForm from "../methods/useLoginForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginForm(): JSX.Element {
  const [body, setBody] = useState("");
  const [nbFetchs, setNbFetchs] = useState(0);
  const methods = useLoginForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOk = async (json: any) => {
    const data = json as IConnectedUser;

    if ("token" in data) {
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    }
  };

  const handleSubmit = async (formData: TLoginData) => {
    setBody(
      JSON.stringify({
        email: formData.email,
        password: formData.password,
      })
    );
    setNbFetchs(nbFetchs + 1);
  };

  const onSubmit = async (data: TLoginData): Promise<void> => {
    await handleSubmit(data);
  };

  const handleGoogle = async () => {
    window.location.href = `${NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {});
  }, [router]);

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetchs}
        route="/api/auth/login"
        body={body}
        handleOk={handleOk}
        setIsLoading={setIsLoading}
      />
      <FormProvider {...methods}>
        <form
          className="text-tertiary flex flex-col gap-2 w-full mt-6 xl:mt-24"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="email"
            className="mb-4 rounded-[30px] shadow-md bg-background-inputfield text-tertiary py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-tertiary-hover placeholder-tertiary-hover"
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
          <a
            className="text-tertiary font-medium text-sm self-end underline"
            title="forgotten_password"
            href="/forgotten_password"
          >
            Mot de passe oublié ?
          </a>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <button
              type="submit"
              className="py-3 rounded-[30px]  font-bold shadow-lg bg-primary text-white w-full hover:bg-primary-hover disabled:bg-primary-disabled"
              disabled={isLoading}
              name="login"
            >
              Se connecter
            </button>
            <div className="flex flex-row items-center">
              <span className="bg-tertiary w-full rounded-full h-[2px]" />
              <span className="text-tertiary font-semibold px-6">Ou</span>
              <span className="bg-tertiary w-full rounded-full h-[2px]" />
            </div>
            <button
              type="button"
              className="py-3 rounded-[30px] font-semibold shadow-lg bg-secondary text-teritary w-full hover:bg-secondary-hover disabled:bg-secondary-disabled"
              disabled={isLoading}
              name="login"
              onClick={handleGoogle}
            >
              <Google className="mr-2" style={{ marginTop: "-4px" }} />
              Se connecter avec Google
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
