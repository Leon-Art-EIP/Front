import { UseFormReturn, useForm } from "react-hook-form";
import { TCreateCollectionData, createCollectionSchema } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* c8 ignore start */

export default function useCreateCollectionForm(): UseFormReturn<TCreateCollectionData> {
  const methods = useForm<TCreateCollectionData>({
    defaultValues: {
      collectionName: "",
    },
    resolver: zodResolver(createCollectionSchema),
  });

  return methods;
}

/* c8 ignore stop */
