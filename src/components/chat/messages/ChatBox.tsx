import { useEffect, useRef } from "react";
import { IMessages } from "../../../interfaces/chat/messages";
import { IConnectedUser } from "../../../interfaces/user/user";
import { Chat } from "./Chat";

export interface ChatBoxProps {
  messages: IMessages;
  currentUser: IConnectedUser | undefined;
}

export function ChatBox(props: ChatBoxProps): JSX.Element {
  {
    /* c8 ignore start */
  }
  const chatBoxRef = useRef<HTMLDivElement>(null);
  let prevDateTime: Date | null = null;

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [props.messages]);

  const formatDate = (string: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  const formatTime = (string: string) => {
    return new Date(string).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div ref={chatBoxRef} dir="btt" className="flex flex-col h-full w-full overflow-y-auto gap-4">
      {props.messages.messages.map((message, index) => {
        const currentDateTime = new Date(message.dateTime);
        let showFullDate = false;
        let showTimeOnly = false;

        if (prevDateTime) {
          if (currentDateTime.toDateString() !== prevDateTime.toDateString()) {
            showFullDate = true;
          } else if (Math.abs(currentDateTime.getTime() - prevDateTime.getTime()) >= 2 * 60 * 60 * 1000) {
            showTimeOnly = true;
          }
        } else {
          showFullDate = true;
        }

        prevDateTime = currentDateTime;

        return (
          <div key={index} className="flex flex-col">
            {showFullDate && (
              <>
                <span className="self-center mt-3 h-1 w-1/3 bg-background-hl rounded-full" />
                <span className="text-lg text-center p-2 text-background-hl">{formatDate(message.dateTime)}</span>
              </>
            )}
            <Chat
              dateTime={showTimeOnly ? formatTime(message.dateTime) : ""}
              key={message.id}
              content={message.content}
              sender={message.senderId === props.currentUser?.user.id ? 0 : 1}
            />
          </div>
        );
      })}
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
