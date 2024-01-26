export interface IAboutProps {
  title: string;
  description?: string;
}

/* c8 ignore start */

export default function About(props: IAboutProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-xl text-justify">{props.title}</div>
      <div className="text-justify">{props.description || "Pas de biographie"}</div>
    </div>
  );
}

/* c8 ignore stop */
