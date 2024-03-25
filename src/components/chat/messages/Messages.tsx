import { useChat } from "../../../contexts/ChatContext";
import { ChatBox } from "./ChatBox";
import { ChatUserBanner } from "./ChatUserBanner";
import { MessageInput } from "./MessageInput";

export default function Messages(): JSX.Element {
  const { currentUser, currentChat, sendMessage } = useChat() || {};

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
        <div className="flex flex-col h-full w-full">
          <ChatBox />
          <MessageInput handleSendMsg={handleSendMsg} />
        </div>
      </div>
    </div>
  );
}
