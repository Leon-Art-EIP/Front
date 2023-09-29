"use client";

import { FormProvider, useController } from "react-hook-form";
import Input from "../../components/form/Input";
import { useState } from "react";
import useLoginForm from "../methods/useLoginForm";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "../../recoil/SetupRecoil";
import { IError, ISuccess } from "../../interfaces";
import { TLoginData } from "../../zod";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginForm(): JSX.Element {
  const [connectionError, setConnectionError] = useState("");
  const methods = useLoginForm();
  const router = useRouter();
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const [disableLogin, setDisableLogin] = useState(false);

  const handleSubmit = async (formData: TLoginData) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = (await response.json()) as ISuccess | IError;

      if ("token" in data) {
        const token = data.token;
        console.log("token", token);
        localStorage.setItem("token", token);
        setLoggedIn(true);
        router.push("/");
      } else {
        setConnectionError("Erreur lors de la connexion.");
      }
      methods.reset();
    } catch (error) {
      setConnectionError("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const onSubmit = async (data: TLoginData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4 w-full mt-6 xl:mt-24" onSubmit={methods.handleSubmit(onSubmit)}>
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
        <div className="flex flex-col justify-center mt-5 gap-2">
          {connectionError && <div className="text-center text-red-500">{connectionError}</div>}
          <button
            type="submit"
            className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white w-full hover:bg-[#c51708] disabled:bg-gray-300"
            disabled={disableLogin}
            name="login"
          >
            Se connecter
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
