import { useState } from "react";

export interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  setError: (error: string) => void;
}

export default function Form({ handleSubmit, error, setError }: FormProps): JSX.Element {
  function handleInputChange() {
    setError("");
  }

  return (
    <form className="flex flex-col gap-2 w-full mt-6 xl:mt-24" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        className="rounded-[30px] shadow-lg bg-[#F5F5F5] text-gray-700 py-3 px-7 w-full focus:outline-none focus:ring-1 focus:ring-[#ae1609] placeholder-gray-500"
        placeholder="Adresse email"
        onChange={handleInputChange}
      />
      <div className="relative">
        {error && <label className="absolute top-2 text-sm font-normal text-red-500">{error}</label>}
        <button
          type="submit"
          className="py-3 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 w-full hover:bg-[#c51708] disabled:bg-gray-300"
          disabled={error !== ""}
          name="reset"
        >
          Réinitialiser
        </button>
      </div>
      <label className="flex justify-center items-center font-normal xl:flex-row flex-col">
        Vous vous souvenez du mot de passe ?
        <a className="ms-1 font-extrabold text-[#E11C0A] cursor-pointer" title="login" href="/login">
          S&pos;identifier
        </a>
      </label>
    </form>
  );
}
