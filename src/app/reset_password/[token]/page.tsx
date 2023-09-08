"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Gallery from "../../../components/gallery";
import zxcvbn from 'zxcvbn';
import { isLoggedIn } from "../../../recoil/SetupRecoil";

interface IBaseFormValues {
  newPassword: string;
  confirmNewPassword: string;
}

export default function Page(props: { params: { token: string } }): JSX.Element {

  const [validToken, setValidToken] = useState(true);
  const [disableLogin, setDisableLogin] = useState(false);
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const router = useRouter();

  const [error, setError] = useState("");

  useEffect(() => {
    console.log(props.params.token)
    if (props.params.token) {
      const token = props.params.token;
      fetch("http://localhost:5000/api/auth/reset-password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }).then(async (response) => {
        const data = await response.json();
        if (data.success) {
          setLoggedIn(true);
        } else {
          setError(data.error);
          router.push("/login");
        }
      });
    }
  }, []);

  function validateForm({ newPassword, confirmNewPassword }: IBaseFormValues) {
    if (!newPassword || !confirmNewPassword) {
      setError("Veuillez remplir tous les champs.");
      setDisableLogin(true);
      return false;
    } else if (newPassword !== confirmNewPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setDisableLogin(true);
      return false;
    } else if (zxcvbn(newPassword).score < 3) {
      setError("Le mot de passe n'est pas assez puissant.");
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
        newPassword: event.currentTarget.newPassword.value,
        confirmNewPassword: event.currentTarget.confirmNewPassword.value
      })
    ) {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: event.currentTarget.newPassword.value,
        }),
      });
    }
  };

  return (
    <>
    {validToken ? 
      <div className="flex h-screen">
        <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
          <label className="xl:hidden block text-6xl font-bold">
            <span className="leon-title">Leon</span>
            <span className="art-title">'Art</span>
          </label>
          <div className="max-w-xs w-full pt-28 xl:pt-0">
            <label className="xl:text-5xl text-2xl xl:font-extrabold xl:leading-relaxed font-semibold w-full xl:text-center text-start">Réinitialiser votre mot de passe</label>
            <form className="flex flex-col gap-4 w-full mt-6 xl:mt-24" onSubmit={handleSubmit}>
              <input
                type="password"
                name="newPassword"
                className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
                placeholder="Nouveau mot de passe"
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="confirmNewPassword"
                className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
                placeholder="Confirmer le nouveau mot de passe"
                onChange={handleInputChange}
              />
              <div className="relative">
                {error && <label className="absolute top-2 text-sm font-normal text-red-500">{error}</label>}
                <button type="submit" className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 w-full hover:bg-[#c51708] disabled:bg-gray-300" disabled={disableLogin} name="reset">
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
          <Gallery></Gallery>
        </div>
      </div>
      : <div className="flex h-screen w-screen flex-col gap-4 justify-center items-center">
        <div role="status">
          <svg aria-hidden="true" className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="ml-2 text-gray-700 dark:text-gray-400">Vérification du token...</div>
      </div>
    }
    </>
  );
}
