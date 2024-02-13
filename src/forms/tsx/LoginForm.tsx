"use client";

import { FormProvider } from "react-hook-form";
import Input from "../../components/form/Input";
import { useState } from "react";
import useLoginForm from "../methods/useLoginForm";
import { useRouter } from "next/navigation";
import { TLoginData } from "../../zod";
import { IConnectedUser } from "../../interfaces/user/user";
import FetcherDiv from "../../components/fetch/FetcherDiv";

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
    <FetcherDiv
      method="POST"
      nbFetchs={nbFetchs}
      route="/api/auth/login"
      successStr="Connexion réussie."
      body={body}
      handleOk={handleOk}
      setIsLoading={setIsLoading}
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4 w-full mt-6 xl:mt-24" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            type="text"
            name="email"
            className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
            placeholder="Adresse email"
          />
          <Input
            type="password"
            name="password"
            className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
            placeholder="Mot de passe"
          />
          <div className="flex flex-col justify-center mt-5 gap-2">
            <button
              type="submit"
              className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white w-full hover:bg-[#c51708] disabled:bg-gray-300"
              disabled={isLoading}
              name="login"
            >
              Se connecter
            </button>
          </div>
        </form>
      </FormProvider>
    </FetcherDiv>
  );
}
