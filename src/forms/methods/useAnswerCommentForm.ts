import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TAddCommentData, addCommentSchema } from "../../zod";

export default function useAnswerCommentForm(): UseFormReturn<TAddCommentData> {
  const methods = useForm<TAddCommentData>({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(addCommentSchema),
  });

  return methods;
}
