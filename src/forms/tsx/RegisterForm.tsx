"use client";

import { FormProvider } from "react-hook-form";
import Input from "../../components/form/Input";
import useRegisterForm from "../methods/useRegisterForm";
import { TRegisterData } from "../../zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IError } from "../../interfaces";
import { IConnectedUser } from "../../interfaces/user/user";
import { myFetch } from "../../tools/myFetch";

export default function RegisterForm(): JSX.Element {
  const methods = useRegisterForm();
  const router = useRouter();
  const [disableRegister, setDisableRegister] = useState(false);
  const [connectionError, setConnectionError] = useState("");

  const handleSubmit = async (formData: TRegisterData) => {
    try {
      const response = await myFetch({
        route: "/api/auth/signup",
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = (await response.json()) as IConnectedUser | IError;

      if ("token" in data) {
        console.log("data", data);
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      } else {
        setConnectionError(data.errors[0].msg);
      }
      // methods.reset();
    } catch (error) {
      setConnectionError("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const onSubmit = async (data: TRegisterData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
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
          <input type="checkbox" name="conscent" />
          <label htmlFor="terms" className="text-sm font-normal w-11/12 text-center">
            En vous enregistrant, vous acceptez les{" "}
            <a className="font-semibold text-[#E11C0A] cursor-pointer">Conditions d&pos;utilisations</a> et{" "}
            <a className="font-semibold text-[#E11C0A] cursor-pointer">notre Politique de confidentialité</a>
          </label>
        </div>
        <div className="flex flex-col gap-2">
          {connectionError && <div className="text-center text-red-500">{connectionError}</div>}
          <button
            type="submit"
            className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white w-full hover:bg-[#c51708] disabled:bg-gray-300"
            disabled={disableRegister}
            name="reset"
          >
            S&pos;inscrire
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
