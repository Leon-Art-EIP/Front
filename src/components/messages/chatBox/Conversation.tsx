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
  messageService: MessageService;
}

export default function Conversation(props: ConversationProps): JSX.Element {
  {/* c8 ignore start */}
  return (
    <div className="flex flex-col h-full w-full">
      <UserBanner conversationService={props.conversationService} messageService={props.messageService} />
      <div className="flex flex-row w-full" style={{ height: "calc(100% - 6rem)" }}>
        <div
          key={props.messageService.showOrder + "-" + props.messageService.showRating}
          className={`flex flex-col h-full ${
            !props.messageService.showOrder && !props.messageService.showRating ? "w-full" : "w-3/5"
          }`}
        >
          <ChatBox messageService={props.messageService} conversationService={props.conversationService} />
          <ChatInput conversationService={props.conversationService} messageService={props.messageService} />
        </div>
        <div
          className={`flex flex-col gap-4 ${
            !props.messageService.showOrder && !props.messageService.showRating ? "hidden" : "w-2/5"
          } h-full p-4`}
        >
          {props.messageService.showOrder && (
            <Order
              closeOrder={props.messageService.closeOrder}
              conversationService={props.conversationService}
              messageService={props.messageService}
            />
          )}
          {props.messageService.showRating && (
            <Rating
              closeRating={props.messageService.closeRating}
              conversationService={props.conversationService}
              messageService={props.messageService}
            />
          )}
        </div>
      </div>
    </div>
  );
  {/* c8 ignore stop */}
}
