export interface IAboutProps {
  title: string;
  description: string;
}

export default function About(props: IAboutProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-xl text-justify">{props.title}</div>
      <div className="text-justify">{props.description}</div>
    </div>
  );
}
