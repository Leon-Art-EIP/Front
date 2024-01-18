import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TProfileHeadingData, profileHeadingSchema } from "../../zod";

export default function useProfileHeadingForm(defaultValues?: TProfileHeadingData): UseFormReturn<TProfileHeadingData> {
  const methods = useForm<TProfileHeadingData>({
    defaultValues,
    resolver: zodResolver(profileHeadingSchema),
  });

  return methods;
}
