interface ILabelProps {
  title: string;
  text: string;
}

export default function Label(props: ILabelProps): JSX.Element {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-bold truncate">{props.title}</div>
      <div className="text-justify text-lg truncate">{props.text}</div>
    </div>
  );
}
