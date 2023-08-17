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
      <div className="left-side h-screen w-1/3 flex flex-col items-center justify-center fixed">
        <label className="text-5xl font-extrabold w-4/6 text-center welcome-back">Mot de passe oublié ?</label>
        <form className="flex flex-col gap-8 w-4/6" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            className="login-text-field"
            placeholder="Mot de passe"
            onChange={handleInputChange}
          />
          <div className="relative flex justify-center mt-5">
            {error && <label className="absolute top-2 text-sm font-normal text-red-500">{error}</label>}
            <button type="submit" className="login-button mt-10" disabled={disableLogin} name="login">
              Réinitialiser
            </button>
          </div>
          <label className="flex justify-center font-normal">
            Vous vous souvenez du mot de passe ?{" "}
            <a className="ms-1 font-extrabold" title="register" href="/login">
              S'identifier
            </a>
          </label>
        </form>
      </div>
      <div className="right-side w-2/3 p-4">
        <Gallery redirectUrl={"/register"} redirectText={"S'enregistrer"}></Gallery>
      </div>
    </div>
  );
}
