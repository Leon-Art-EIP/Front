import { ConversationService } from "../../../hooks/messages/useConversationService";
import { MessageService } from "../../../hooks/messages/useMessageService";

export interface ChatBoxProps {
  conversationService: ConversationService;
  messageService: MessageService;
}

export function ChatBox(props: ChatBoxProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {props.messageService.messages.messages.map((message) => (
        <div key={message.id} className="flex flex-row gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-400 flex-shrink-0"></div>
          <div className="flex flex-col">
            <span className="text-lg">{message.content}</span>
            <span className="text-sm">{message.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
