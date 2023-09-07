type TTailwindCustomColor = "primaryBlack" | "primaryRed";

interface IButtonProps {
  title: string;
  onClick(): void;
  backgroundColor: TTailwindCustomColor;
}

export default function Button(props: IButtonProps): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className="text-center text-white rounded-full text-2xl min-h-full px-8 py-4"
      style={{ background: `${props.backgroundColor === "primaryBlack" ? "#2d142c" : "#e03915"}` }}
    >
      {props.title}
    </button>
  );
}
