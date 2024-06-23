import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TShareArtData, shareArtSchema } from "../../zod";

export default function useShareArtForm(id: string): UseFormReturn<TShareArtData> {
  const methods = useForm<TShareArtData>({
    defaultValues: {
      id,
      message: "",
    },
    resolver: zodResolver(shareArtSchema),
  });

  return methods;
}
