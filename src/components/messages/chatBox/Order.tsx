import { ConversationService } from "../../../hooks/messages/useConversationService";
import { MessageService } from "../../../hooks/messages/useMessageService";
import CloseIcon from "@mui/icons-material/Close";
import emojiConfettis from "../../../assets/icons/emoji-conffetis.png";
import Image from "next/image";

export interface OrderProps {
  conversationService: ConversationService;
  messageService: MessageService;
  closeOrder: () => void;
}

export function Order(props: OrderProps): JSX.Element {
  {/* c8 ignore start */}
  function onValidateOffer() {}

  function onDeclineOffer() {}

  function onRecievedOrder() {}

  return (
    <div
      className={`flex flex-grow overflow-y-auto items-center p-6 flex-col gap-4 bg-[#F3F3F3] rounded-2xl w-full relative`}
    >
      <button className="absolute top-4 right-4" onClick={props.closeOrder}>
        <CloseIcon className="fill-[#8F8F8F]" />
      </button>
      <span className="text-2xl font-semibold">
        {props.messageService.orderInfos?.userRole === "buyer" ? "Nouvelle offre" : "Nouvelle commande"}
      </span>
      {props.messageService.orderInfos?.orderPicture ? (
        <img
          className="w-11/12 h-fit max-w-xl rounded-2xl bg-gray-400 object-cover"
          src={props.messageService.orderInfos?.orderPicture}
          alt="Order picture"
        />
      ) : (
        <span className="w-11/12 h-28 rounded-2xl bg-gray-400 flex-shrink-0" />
      )}
      {/* Pending order */}
      {props.messageService.orderInfos?.orderState === "pending" && (
        <>
          <div className="flex flex-col self-start">
            <span className="text-xl font-semibold">Description</span>
            <span className="text-md line-clamp-2 mt-2">{props.messageService.orderInfos?.orderDescription}</span>
            <span className="text-xl font-semibold mt-6">{props.messageService.orderInfos?.orderPrice} €</span>
          </div>
          <div className="flex flex-col flex-grow justify-end w-full gap-4">
            <div className="flex flex-row justify-around">
              <button className="rounded-3xl border border-[#8F8F8F] px-6 py-2 text-black bg-white hover:bg-[#ebebeb]">
                Refuser
              </button>
              <button className="rounded-3xl px-6 py-2 text-white bg-[#e11c0a] hover:bg-[#a5382f]">Accepter</button>
            </div>
            <span className="text-sm text-center">
              Si le prix ne vous convient pas, vous pouvez{" "}
              <a className="text-blue-500 underline" href="/">
                faire une contre-offre
              </a>
            </span>
          </div>
        </>
      )}
      {/* Accepted order */}
      {props.messageService.orderInfos?.orderState === "accepted" && (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Image src={emojiConfettis} alt="conffetis emoji" width={40} height={40} />
              <span className="text-xl font-semibold">Felicitation !</span>
              <Image src={emojiConfettis} alt="conffetis emoji" width={40} height={40} />
            </div>
            <span className="text-md text-center">
              L’offre a été acceptée !
            </span>
          </div>
          <div className="flex flex-col flex-grow justify-end">
            <button className="rounded-3xl px-10 py-2 text-white bg-[#e11c0a] hover:bg-[#a5382f]">Oeuvre récéptionnée</button>
          </div>
        </>
      )}
    </div>
  );
  {/* c8 ignore stop */}
}
