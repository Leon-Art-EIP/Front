"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import zxcvbn from "zxcvbn";
import Gallery from "../../components/gallery";
import { IError, ISuccess } from "../../interfaces";
import { isLoggedIn } from "../../recoil/SetupRecoil";

interface IBaseFormValues {
  username: string;
  email: string;
  password: string;
  conscent: boolean;
}

export default function Page(): JSX.Element {
  const router = useRouter();
  const [disableRegister, setDisableRegister] = useState(false);
  const setLoggedIn = useSetRecoilState(isLoggedIn);

  const [error, setError] = useState("");

  function validateForm({ username, email, password, conscent }: IBaseFormValues) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      setDisableRegister(true);
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Adresse email invalide.");
      setDisableRegister(true);
      return false;
    } else if (username.length > 20) {
      setError("Nom d'utilisateur invalide.");
      setDisableRegister(true);
      return false;
    } else if (zxcvbn(password).score < 3) {
      setError("Mot de passe invalide.");
      setDisableRegister(true);
      return false;
    } else if (!conscent) {
      setError("Veuillez accepter les conditions d'utilisation.");
      setDisableRegister(true);
      return false;
    }
    setDisableRegister(false);
    return true;
  }

  const handleInputChange = () => {
    setError("");
    setDisableRegister(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      validateForm({
        username: event.currentTarget.username.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        conscent: event.currentTarget.conscent.checked,
      })
    ) {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.currentTarget.username.value,
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
        setError(data.errors[0].msg);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <span className="text-[#E11C0A]">Leon</span>
          <span className="text-[#000000]">'Art</span>
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-5xl text-4xl xl:font-extrabold xl:leading-relaxed font-semibold w-full xl:text-center text-start">
            S'enregistrer
          </label>
          <form className="flex flex-col gap-6 w-full mt-6 xl:mt-14" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
              placeholder="Nom d'utilisateur"
              onChange={handleInputChange}
            />
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
            <div className="flex flex-row">
              <input type="checkbox" name="conscent" onChange={handleInputChange} />
              <label htmlFor="terms" className="text-sm font-normal w-11/12 text-center">
                En vous enregistrant, vous acceptez les{" "}
                <a className="font-semibold text-[#E11C0A] cursor-pointer">Conditions d'utilisations</a> et{" "}
                <a className="font-semibold text-[#E11C0A] cursor-pointer">notre Politique de confidentialité</a>
              </label>
            </div>
            <div className="relative">
              {error && (
                <label className="absolute top-2 text-sm font-normal text-red-500 error-message">{error}</label>
              )}
              <button
                type="submit"
                className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white w-full hover:bg-[#c51708] disabled:bg-gray-300"
                disabled={disableRegister}
                name="reset"
              >
                S'inscrire
              </button>
            </div>
            <label className="flex justify-center font-normal">
              Vous avez déjà un compte ?{" "}
              <a className="ms-1 font-extrabold text-[#E11C0A] cursor-pointer" title="login" href="/login">
                Se connecter
              </a>
            </label>
          </form>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/login"} redirectText={"Se connecter"}></Gallery>
      </div>
    </div>
  );
}
