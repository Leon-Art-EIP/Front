"use client";

import { FormProvider } from "react-hook-form";
import Input from "../../components/form/Input";
import useSettingsPasswordForm from "../methods/useSettingsPasswordForm";
import { Button } from "../../components/lib";
import { TSettingsPasswordData } from "../../zod";
import { useState } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import { IConnectedUser } from "../../interfaces/user/user";
import FetcherDiv from "../../components/fetch/FetcherDiv";

interface ISettingsPasswordInputs {
  name: string;
  placeholder: string;
}

export default function SettingsPasswordForm(): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [loading, setLoading] = useState<boolean>(false);
  const [body, setBody] = useState("");
  const [nbFetchs, setNbFetchs] = useState(0);

  const methods = useSettingsPasswordForm();

  if (Object.keys(user).length === 0) {
    return <LoadingPage />;
  }

  const inputs: ISettingsPasswordInputs[] = [
    {
      name: "password",
      placeholder: "Mot de passe actuel",
    },
    {
      name: "newpassword",
      placeholder: "Nouveau mot de passe",
    },
    {
      name: "confirmpassword",
      placeholder: "Confirmation du nouveau mot de passe",
    },
  ];

  const handleOk = () => {
    methods.reset();
  };

  const handleSubmit = async (formData: TSettingsPasswordData) => {
    setBody(
      JSON.stringify({
        currentPassword: formData.password,
        newPassword: formData.newpassword,
      })
    );
    setNbFetchs(nbFetchs + 1);
  };

  const onSubmit = async (data: TSettingsPasswordData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
    <FetcherDiv
      route="/api/auth/change-password"
      method="POST"
      body={body}
      nbFetchs={nbFetchs}
      successStr="Mot de passe modifié avec succès"
      setIsLoading={setLoading}
      handleOk={handleOk}
    >
      <FormProvider {...methods}>
        <form className="flex flex-col p-2 gap-3" onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          {inputs.map((input) => (
            <Input
              key={`settings-password-${input.name}`}
              className="bg-secondaryGrey rounded p-2 truncate max-w-sm"
              name={input.name}
              placeholder={input.placeholder}
              type="password"
            />
          ))}
          <div className="flex [&>*]:flex-1 max-w-sm">
            <Button color="danger" type="submit" loading={loading}>
              Changer le mot de passe
            </Button>
          </div>
        </form>
      </FormProvider>
    </FetcherDiv>
  );
}
