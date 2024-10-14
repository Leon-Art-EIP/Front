import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TRegisterData, registerSchema } from "../../zod";

export default function useRegisterForm(): UseFormReturn<TRegisterData> {
  const methods = useForm<TRegisterData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  return methods;
}
