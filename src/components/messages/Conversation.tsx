import { IConversation } from "../../interfaces/messages/conversations";
import { ConversationService } from "../../hooks/messages/useConversationService";
import Button from "../single-art-page/card/Button";
import { ChatBox } from "./chatBox/ChatBox";
import { MessageService, useMessageService } from "../../hooks/messages/useMessageService";

export interface ConversationProps {
  conversationService: ConversationService;
}

export default function Conversation(props: ConversationProps): JSX.Element {
  
  const messageService = useMessageService(props.conversationService.convSelected?.id);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row p-4 items-center gap-4 shadow-[0px_6px_7px_0px_rgba(170,170,170)]">
        {props.conversationService.convSelected?.profilePricture ? (
          <img
            src={props.conversationService.convSelected.profilePricture}
            alt="profilePicture"
            className="w-16 h-16 rounded-full bg-gray-500 flex-shrink-0"
          />
        ) : (
          <span className="w-16 h-16 rounded-full bg-gray-400 flex-shrink-0"></span>
        )}
        <span className="text-2xl">{props.conversationService.convSelected?.profileName}</span>
      </div>
      <ChatBox messageService={messageService} conversationService={props.conversationService} />
    </div>
  );
}
