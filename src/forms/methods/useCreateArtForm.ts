import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { TCreateArtData, createArtSchema } from "../../zod";

export default function useCreateArtForm(): UseFormReturn<TCreateArtData> {
  const methods = useForm<TCreateArtData>({
    defaultValues: {
      image: undefined,
      artType: "",
      name: "",
      description: "",
      isForSale: false,
      price: "",
      location: undefined,
    },
    resolver: zodResolver(createArtSchema),
  });

  return methods;
}
