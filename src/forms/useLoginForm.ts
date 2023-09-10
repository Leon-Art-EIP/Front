import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TLoginData, loginSchema } from "../zod";

export default function useLoginForm(): UseFormReturn<TLoginData> {
  const methods = useForm<TLoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  return methods;
}
