"use client";

import { FormProvider } from "react-hook-form";
import Input from "../../components/form/Input";
import useSettingsPasswordForm from "../methods/useSettingsPasswordForm";
import { Button } from "../../components/lib";
import { TSettingsPasswordData } from "../../zod";
import { useState } from "react";
import { myFetch } from "../../tools/myFetch";
import LoadingPage from "../../components/loading/LoadingPage";
import { IConnectedUser } from "../../interfaces/user/user";
import { IError } from "../../interfaces";
import { useRouter } from "next/navigation";

interface ISettingsPasswordInputs {
  name: string;
  placeholder: string;
}

export default function SettingsPasswordForm(): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const resetPassword = async (token: string, newPassword: string) => {
    const response = await myFetch({
      route: "/api/auth/reset-password",
      method: "POST",
      body: JSON.stringify({
        token: token,
        newPassword,
      }),
    });

    const data = (await response.json()) as IError | { msg: string };

    if (response.status === 200) {
      localStorage.removeItem("user");
      router.push("/login");
    } else if ("errors" in data) {
      methods.setError("newpassword", {
        type: "manual",
        message: data.errors[0].msg,
      });
    } else {
      methods.setError("confirmpassword", {
        type: "manual",
        message: data.msg,
      });
    }
  };

  const handleSubmit = async (formData: TSettingsPasswordData) => {
    const response = await myFetch({
      route: "/api/auth/login",
      method: "POST",
      body: JSON.stringify({
        email: user.user.email,
        password: formData.password,
      }),
    });

    const data = (await response.json()) as IConnectedUser | IError;

    if ("token" in data) {
      user.token = data.token;
      localStorage.setItem("user", JSON.stringify(user));
      resetPassword(data.token, formData.newpassword);
    } else {
      methods.setError("password", {
        type: "manual",
        message: "Mot de passe incorrect",
      });
    }
  };

  const onSubmit = async (data: TSettingsPasswordData): Promise<void> => {
    setLoading(true);

    setTimeout(async () => {
      await handleSubmit(data);
      setLoading(false);
    }, 5000);
  };

  return (
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
  );
}
