"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Gallery from "../../components/gallery";
import { IError, ISuccess } from "../../interfaces";
import { isLoggedIn } from "../../recoil/SetupRecoil";

interface IBaseFormValues {
  email: string;
  password: string;
}

export default function Page(): JSX.Element {
  const [disableLogin, setDisableLogin] = useState(false);
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const router = useRouter();

  const [error, setError] = useState("");

  function validateForm({ email, password }: IBaseFormValues) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setDisableLogin(true);
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Adresse email invalide.");
      setDisableLogin(true);
      return false;
    }
    setDisableLogin(false);
    return true;
  }

  const handleInputChange = () => {
    setError("");
    setDisableLogin(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      validateForm({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      })
    ) {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
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
        setError("Erreur lors de la connexion.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-5xl text-2xl xl:font-extrabold xl:leading-relaxed font-semibold w-full xl:text-center text-start">
            Se connecter
          </label>
          <form className="flex flex-col gap-4 w-full mt-6 xl:mt-24" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
              placeholder="Adresse email"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
              placeholder="Mot de passe"
              onChange={handleInputChange}
            />
            <div className="relative flex justify-center mt-5">
              {error && <label className="absolute top-2 text-sm font-normal text-red-500">{error}</label>}
              <button
                type="submit"
                className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 w-full hover:bg-[#c51708] disabled:bg-gray-300"
                disabled={disableLogin}
                name="login"
              >
                Se connecter
              </button>
            </div>
            <label className="flex justify-center font-normal">
              Vous n'avez pas de compte ?{" "}
              <a className="ms-1 font-extrabold text-[#E11C0A] cursor-pointer" title="register" href="/register">
                S'enregistrer
              </a>
            </label>
          </form>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/register"} redirectText={"S'enregistrer"}></Gallery>
      </div>
    </div>
  );
}
