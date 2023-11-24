import { IConversation } from "../../../interfaces/messages/conversations";
import { ConversationService } from "../../../hooks/messages/useConversationService";
import Button from "../../single-art-page/card/Button";
import { ChatBox } from "./ChatBox";
import { MessageService, useMessageService } from "../../../hooks/messages/useMessageService";
import { ChatInput } from "./ChatInput";
import { UserBanner } from "./UserBanner";
import { Order } from "./Order";
import { Rating } from "./Rating";

export interface ConversationProps {
  conversationService: ConversationService;
}

export default function Conversation(props: ConversationProps): JSX.Element {
  {/* c8 ignore start */}
  const messageService = useMessageService(props.conversationService);

  return (
    <div className="flex flex-col h-full w-full">
      <UserBanner conversationService={props.conversationService} messageService={messageService} />
      <div className="flex flex-row w-full" style={{ height: "calc(100% - 6rem)" }}>
        <div
          key={messageService.showOrder + "-" + messageService.showRating}
          className={`flex flex-col h-full ${
            !messageService.showOrder && !messageService.showRating ? "w-full" : "w-3/5"
          }`}
        >
          <ChatBox messageService={messageService} conversationService={props.conversationService} />
          <ChatInput conversationService={props.conversationService} messageService={messageService} />
        </div>
        <div
          className={`flex flex-col gap-4 ${
            !messageService.showOrder && !messageService.showRating ? "hidden" : "w-2/5"
          } h-full p-4`}
        >
          {messageService.showOrder && (
            <Order
              closeOrder={messageService.closeOrder}
              conversationService={props.conversationService}
              messageService={messageService}
            />
          )}
          {messageService.showRating && (
            <Rating
              closeRating={messageService.closeRating}
              conversationService={props.conversationService}
              messageService={messageService}
            />
          )}
        </div>
      </div>
    </div>
  );
  {/* c8 ignore stop */}
}
