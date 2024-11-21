import { UseFormReturn, useForm } from "react-hook-form";
import { TCreateCollectionData, createCollectionSchema } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useCreateCollectionForm(): UseFormReturn<TCreateCollectionData> {
  const methods = useForm<TCreateCollectionData>({
    defaultValues: {
      collectionName: "",
    },
    resolver: zodResolver(createCollectionSchema),
  });

  return methods;
}
