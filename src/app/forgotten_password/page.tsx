"use client";

import React, { useState } from "react";
import Gallery from "../../components/gallery";
import Form from "./form";

interface IBaseFormValues {
  email: string;
}

export default function Page(): JSX.Element {
  const [error, setError] = useState("");

  function validateForm({ email }: IBaseFormValues) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Veuillez remplir le champ.");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Adresse email invalide.");
      return false;
    }
    setError("");
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      validateForm({
        email: event.currentTarget.email.value,
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
      <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <span className="text-[#E11C0A]">Leon</span>
          <span className="text-[#000000]">'Art</span>
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-[43px] text-2xl xl:font-extrabold xl:leading-relaxed font-semibold w-4/6 xl:text-center text-start">
            Mot de passe oublié ?
          </label>
          <Form handleSubmit={handleSubmit} error={error} setError={setError}></Form>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/login"} redirectText={"S'identifier"}></Gallery>
      </div>
    </div>
  );
}
