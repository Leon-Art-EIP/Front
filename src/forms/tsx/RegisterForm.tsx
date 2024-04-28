"use client";

import { Google } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { IConnectedUser } from "../../interfaces/user/user";
import { TRegisterData } from "../../zod";
import useRegisterForm from "../methods/useRegisterForm";

export default function RegisterForm(): JSX.Element {
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");
  const methods = useRegisterForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = async (json: any) => {
    const data = json as IConnectedUser;

    if ("token" in data) {
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
    await handleSubmit(data);
  };

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
      <FormProvider {...methods}>
        <form className="flex flex-col gap-6 w-full mt-6 xl:mt-14" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            type="text"
            name="username"
            className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
            placeholder="Nom d'utilisateur"
          />
          <Input
            type="email"
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
          <div className="flex flex-row">
            <Input type="checkbox" name="conscent" placeholder="" />
            <label htmlFor="terms" className="text-sm font-normal w-11/12 text-center">
              En vous enregistrant, vous acceptez les
              <a className="font-semibold text-[#E11C0A] cursor-pointer"> Conditions d{"'"}utilisations</a> et
              <a className="font-semibold text-[#E11C0A] cursor-pointer"> notre Politique de confidentialité</a>
            </label>
          </div>
          <div className="flex flex-col gap-2 justify-center mt-5 ">
            <button
              type="submit"
              className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white w-full hover:bg-[#c51708] disabled:bg-gray-300"
              disabled={isLoading}
              name="reset"
            >
              S{"'"}inscrire
            </button>
            <button
              type="submit"
              className="py-3 rounded-[30px] shadow-lg bg-secondary text-teritary w-full hover:bg-secondary-hover disabled:bg-secondary-disabled"
              disabled={isLoading}
              name="reset"
            >
              <Google className="mr-2" style={{ marginTop: "-4px" }} />S{"'"}inscrire avec Google
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
