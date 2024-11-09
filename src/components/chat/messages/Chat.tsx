import { useState } from "react";

export interface ChatProps {
  content: string;
  sender: 0 | 1;
  dateTime: string;
}

export function Chat(props: ChatProps): JSX.Element {
  const [showDateTime, setShowDateTime] = useState(false);

  return (
    <div className={`flex flex-row ${props.sender ? "justify-start" : "justify-end"} items-center px-6`}>
      {showDateTime && props.dateTime && props.sender === 0 && (
        <span className="text-sm px-2 py-1 text-tertiary-hover opacity-30">{props.dateTime}</span>
      )}
      <div
        className={`rounded-2xl p-4 max-w-xl break-words ${
          props.sender ? "bg-background-hl text-tertiary" : "bg-primary text-white"
        }`}
        onMouseEnter={() => setShowDateTime(true)}
        onMouseLeave={() => setShowDateTime(false)}
      >
        {props.content.split("\n").map((line, index) => (
          <p key={index} className="mb-1">
            {line}
          </p>
        ))}
      </div>
      {showDateTime && props.dateTime && props.sender === 1 && (
        <span className="text-sm px-2 py-1 text-tertiary-hover opacity-30">{props.dateTime}</span>
      )}
    </div>
  );
}
