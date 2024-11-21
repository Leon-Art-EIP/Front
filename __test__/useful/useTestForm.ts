import type { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

/**
 * Form to be used in storybook
 */
export default function useTestForm<TFieldValues extends FieldValues>(
  defaultValues?: DefaultValues<TFieldValues>
): UseFormReturn<TFieldValues> {
  const methods = useForm<TFieldValues>({ defaultValues });

  return methods;
}
