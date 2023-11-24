import Image from "next/image";
import { ConversationService } from "../../../hooks/messages/useConversationService";
import { MessageService } from "../../../hooks/messages/useMessageService";

export interface UserBannerProps {
  conversationService: ConversationService;
  messageService: MessageService;
}

export function UserBanner(props: UserBannerProps): JSX.Element {
  {
    /* c8 ignore start */
  }
  return (
    <div className="flex flex-row h-24 p-4 items-center gap-4 shadow-[0px_6px_7px_0px_rgba(170,170,170)] z-10">
      {props.conversationService.convSelected?.profilePricture ? (
        /* TODO: use <Image> next component */
        /* eslint-disable-next-line @next/next/no-img-element */
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
  );
  {
    /* c8 ignore stop */
  }
}
