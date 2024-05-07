import { useChat } from "../../../contexts/ChatContext";
import { ChatBox } from "./ChatBox";
import { ChatUserBanner } from "./ChatUserBanner";
import { MessageInput } from "./MessageInput";

export default function Messages(): JSX.Element {
  {
    /* c8 ignore start */
  }
  const { currentUser, currentChat, setCurrentChat, sendMessage } = useChat() || {};

  function getOtherUser() {
    if (currentChat?.UserOneId === currentUser?.user.id) {
      return currentChat?.UserTwoId;
    } else {
      return currentChat?.UserOneId;
    }
  }

  function handleSendMsg(msg: string) {
    var to = getOtherUser();
    if (to) {
      sendMessage(msg, to);
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      {currentChat && <ChatUserBanner currentChat={currentChat} currentUser={currentUser} />}
      <div className="flex flex-row w-full" style={{ height: "calc(100% - 6rem)" }}>
        <div
          className="flex flex-col h-full w-full"
          // className={`flex flex-col h-full ${
          //   showOrder && showRating ? "w-full" : "w-3/5"
          // }`} // TODO: choose 3/5 when there is an order betweeen the artist and the client
        >
          <ChatBox />
          <MessageInput handleSendMsg={handleSendMsg} />
        </div>
      </div>
      {/* <div
          className={`flex flex-col gap-4 ${
            !props.messageService.showOrder && !props.messageService.showRating ? "hidden" : "w-2/5"
          } h-full p-4`}
        >
          <Order
            closeOrder={props.messageService.closeOrder}
            conversationService={props.conversationService}
            messageService={props.messageService}
          />
          <Rating
            closeRating={props.messageService.closeRating}
            conversationService={props.conversationService}
            messageService={props.messageService}
          />
          )}
        </div> */}
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
