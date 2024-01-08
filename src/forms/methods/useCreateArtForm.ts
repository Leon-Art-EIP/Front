import { UseFormReturn, useForm } from "react-hook-form";
import { TCreateArtData, createArtSchema } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useCreateArtForm(): UseFormReturn<TCreateArtData> {
  const methods = useForm<TCreateArtData>({
    defaultValues: {
      image: "",
      artType: "",
      name: "",
      description: "",
      dimensions: "",
      isForSale: false,
      price: 0,
      location: "",
    },
    resolver: zodResolver(createArtSchema),
  });

  return methods;
}
