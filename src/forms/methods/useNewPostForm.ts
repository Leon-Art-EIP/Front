import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TNewPostData, newPostSchema } from "../../zod";

export default function useNewPostForm(): UseFormReturn<TNewPostData> {
  const methods = useForm<TNewPostData>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(newPostSchema),
  });

  return methods;
}
