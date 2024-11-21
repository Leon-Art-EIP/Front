import { FormProvider } from "react-hook-form";
import type { ReactNode } from "react";
import useTestForm from "./useTestForm";

interface ITestInputProps {
  name: string;
  value?: string[] | string;
  children: ReactNode;
}

export default function TestFormComponent(props: ITestInputProps): JSX.Element {
  const methods = useTestForm({ [props.name]: props.value });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
