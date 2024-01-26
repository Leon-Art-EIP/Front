type TTailwindCustomColor = "primaryBlack" | "primaryRed";

interface IButtonProps {
  title: string;
  onClick?(): void;
  backgroundColor: TTailwindCustomColor;
  disabled?: boolean;
  id?: string;
}

/* c8 ignore start */

export default function Button(props: IButtonProps): JSX.Element {
  return (
    <button
      id={props.id}
      disabled={props.disabled}
      onClick={props.onClick}
      className="text-center text-white rounded-full lg:text-xl min-h-full px-8 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ background: `${props.backgroundColor === "primaryBlack" ? "#2d142c" : "#e03915"}` }}
    >
      {props.title}
    </button>
  );
}

/* c8 ignore stop */
