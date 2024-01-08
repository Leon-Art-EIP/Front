import CreateArtForm, { ICreateArtFormProps } from "../../../forms/tsx/CreateArtForm";

export default function CreateSingleArt(props: ICreateArtFormProps): JSX.Element {
  return <CreateArtForm options={props.options} />;
}
