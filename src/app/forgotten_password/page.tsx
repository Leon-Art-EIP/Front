"use client";

import React, { useState } from "react";
import Gallery from "../../components/gallery";
import Form from "./form";

interface IBaseFormValues {
  email: string;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Page(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm({ email }: IBaseFormValues) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrorMessage("Veuillez remplir le champ.");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Adresse email invalide.");
      return false;
    }
    setErrorMessage("");
    setSuccessMessage("");
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      validateForm({
        email: event.currentTarget.email.value,
      })
    ) {
      setIsLoading(true);
      const response = await fetch(NEXT_PUBLIC_BACKEND_URL + "/api/auth/request-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
        }),
      });
      setIsLoading(false);
      if (response.status === 404) {
        setErrorMessage("Aucun compte n'est associé à cette adresse email.");
      } else if (response.status === 200) {
        setSuccessMessage("Un email de réinitialisation vous a été envoyé.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <span className="text-[#E11C0A]">Leon</span>
          <span className="text-[#000000]">&apos;Art</span>
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-[43px] text-2xl xl:font-extrabold xl:leading-relaxed font-semibold w-4/6 xl:text-center text-start">
            Mot de passe oublié ?
          </label>
          <Form
            handleSubmit={handleSubmit}
            error={errorMessage}
            setError={setErrorMessage}
            success={successMessage}
            setSuccess={setSuccessMessage}
            isLoading={isLoading}
          ></Form>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/login"} redirectText={"S'identifier"}></Gallery>
      </div>
    </div>
  );
}
