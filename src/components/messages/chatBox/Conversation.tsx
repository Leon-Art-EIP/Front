import { IConversation } from "../../../interfaces/messages/conversations";
import { ConversationService } from "../../../hooks/messages/useConversationService";
import Button from "../../single-art-page/card/Button";
import { ChatBox } from "./ChatBox";
import { MessageService, useMessageService } from "../../../hooks/messages/useMessageService";
import { ChatInput } from "./ChatInput";
import { UserBanner } from "./UserBanner";

export interface ConversationProps {
  conversationService: ConversationService;
}

export default function Conversation(props: ConversationProps): JSX.Element {
  const messageService = useMessageService(props.conversationService.convSelected?.id);

  return (
    <div className="flex flex-col h-full w-full">
      <UserBanner conversationService={props.conversationService} messageService={messageService} />
      <ChatBox messageService={messageService} conversationService={props.conversationService} />
      <ChatInput conversationService={props.conversationService} messageService={messageService} />
    </div>
  );
}
