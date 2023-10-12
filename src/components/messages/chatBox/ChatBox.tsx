import { useEffect, useRef } from "react";
import { ConversationService } from "../../../hooks/messages/useConversationService";
import { MessageService } from "../../../hooks/messages/useMessageService";
import { Chat } from "./Chat";

export interface ChatBoxProps {
  conversationService: ConversationService;
  messageService: MessageService;
}

export function ChatBox(props: ChatBoxProps): JSX.Element {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  let prevDateTime: Date | null = null;

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [props.messageService.messages]);

  const formatDate = (string: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  const formatTime = (string: string) => {
    return new Date(string).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div 
      ref={chatBoxRef}
      dir="btt" 
      className="flex flex-col h-full w-full overflow-y-auto gap-4"
    >
      {props.messageService.messages.messages.map((message, index) => {
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
          <div key={message.id} className="flex flex-col">
            {showFullDate && (
              <>
                <span className="self-center mt-3 h-1 w-1/3 bg-[#c1c1c1] rounded-full" />
                <span className="text-lg text-center p-2 text-[#858585]">{formatDate(message.dateTime)}</span>
              </>
            )}
            <Chat
              dateTime={showTimeOnly ? formatTime(message.dateTime) : ""}
              key={message.id}
              content={message.content}
              sender={message.sender}
            />
          </div>
        );
      })}
    </div>
  );
}
