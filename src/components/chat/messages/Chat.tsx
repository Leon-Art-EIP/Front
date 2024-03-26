export interface ChatProps {
  content: string;
  sender: 0 | 1;
  dateTime: string;
}

export function Chat(props: ChatProps): JSX.Element {
  {
    /* c8 ignore start */
  }
  return (
    <div className={`flex flex-col ${props.sender ? "items-start" : "items-end"} justify-center px-6`}>
      <div
        className={`rounded-2xl p-4 max-w-xl ${
          props.sender ? "bg-background text-tertiary" : "bg-background-hl text-tertiary"
        }`}
      >
        {props.content}
      </div>
      {props.dateTime && <span className="text-md px-2 py-1 text-primary">{props.dateTime}</span>}
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
