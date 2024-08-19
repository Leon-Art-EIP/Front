import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TSettingsPasswordData, settingsPasswordSchema } from "../../zod";

export default function useSettingsPasswordForm(): UseFormReturn<TSettingsPasswordData> {
  const methods = useForm<TSettingsPasswordData>({
    defaultValues: {
      password: "",
      newpassword: "",
      confirmpassword: "",
    },
    resolver: zodResolver(settingsPasswordSchema),
  });

  return methods;
}
