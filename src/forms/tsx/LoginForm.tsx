"use client";

import { Google } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { IConnectedUser } from "../../interfaces/user/user";
import { TLoginData } from "../../zod";
import useLoginForm from "../methods/useLoginForm";

export default function LoginForm(): JSX.Element {
  const [body, setBody] = useState("");
  const [nbFetchs, setNbFetchs] = useState(0);
  const methods = useLoginForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = async (json: any) => {
    const data = json as IConnectedUser;

    if ("token" in data) {
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
      // console.log("Token: " + JSON.stringify(data.token));
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
          className="text-tertiary flex flex-col gap-4 w-full mt-6 xl:mt-24"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="email"
            className="rounded-[30px] shadow-lg bg-background text-tertiary py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-secondary"
            placeholder="Adresse email"
          />
          <Input
            type="password"
            name="password"
            className="rounded-[30px] shadow-lg bg-background text-tertiary py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-secondary"
            placeholder="Mot de passe"
          />
          <div className="flex flex-col justify-center mt-5 gap-2">
            <button
              type="submit"
              className="py-3 rounded-[30px] shadow-lg bg-primary text-white w-full hover:bg-primary-hover disabled:bg-primary-disabled"
              disabled={isLoading}
              name="login"
            >
              Se connecter
            </button>
            <button
              type="submit"
              className="py-3 rounded-[30px] shadow-lg bg-secondary text-teritary w-full hover:bg-secondary-hover disabled:bg-secondary-disabled"
              disabled={isLoading}
              name="login"
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
