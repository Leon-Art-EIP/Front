"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Gallery from "../../components/gallery";
import { IError, ISuccess } from "../../interfaces";
import { isLoggedIn } from "../../recoil/SetupRecoil";
import "./page.css";

interface IBaseFormValues {
  email: string;
}

export default function Page(): JSX.Element {
  const [disableLogin, setDisableLogin] = useState(false);
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const router = useRouter();

  const [error, setError] = useState("");

  function validateForm({ email }: IBaseFormValues) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Veuillez remplir le champ.");
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
        email: event.currentTarget.email.value
      })
    ) {
      const response = await fetch("http://localhost:5000/api/auth/forgotten-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
        }),
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="left-pannel h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <span className="leon-title">Leon</span>
          <span className="art-title">'Art</span>
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-5xl text-2xl xl:font-extrabold xl:leading-relaxed font-semibold w-4/6 xl:text-center text-start">Forgot your password ?</label>
          <form className="flex flex-col gap-2 w-full mt-6 xl:mt-24" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="login-text-field"
              placeholder="Adresse email"
              onChange={handleInputChange}
            />
            <div className="relative">
              {error && <label className="absolute top-2 text-sm font-normal text-red-500">{error}</label>}
              <button type="submit" className="login-button mt-10 w-full" disabled={disableLogin} name="reset">
                Réinitialiser
              </button>
            </div>
            <label className="flex justify-center items-center font-normal xl:flex-row flex-col">
              Vous vous souvenez du mot de passe ?
              <a className="ms-1 font-extrabold" title="login" href="/login">
                S'identifier
              </a>
            </label>
          </form>
        </div>
      </div>
      <div className="xl:block hidden right-side w-2/3 p-4">
        <Gallery redirectUrl={"/login"} redirectText={"S'identifier"}></Gallery>
      </div>
    </div>
  );
}
