import { ChatBox } from "./ChatBox";
import { MessageInput } from "./MessageInput";
import { ChatUserBanner } from "./ChatUserBanner";
import { Order } from "./Order";
import { Rating } from "./Rating";
import { IChat } from "../../../interfaces/chat/chats";
import { Socket } from "socket.io-client";
import { RefObject, useEffect, useState } from "react";
import { myFetch } from "../../../tools/myFetch";
import { IMessage, IMessages } from "../../../interfaces/chat/messages";
import { IConnectedUser } from "../../../interfaces/user/user";

export interface MessagesProps {
  currentChat: IChat;
  currentUser: IConnectedUser | undefined;
  socket: RefObject<Socket>;
}

export default function Messages(props: MessagesProps): JSX.Element {
  {/* c8 ignore start */}
  const [messages, setMessages] = useState<IMessages>({ messages: [] });
  const [arrivalMessage, setArrivalMessage] = useState<IMessage>();

  useEffect(() => {
    async function fetchMessages() {
      const res = await myFetch({
        route: `/api/chats/messages/${props.currentChat._id}`,
        method: "GET" });
      const data = await res.json();
      setMessages(data);
    }
    fetchMessages();
  }, [props.currentChat]);

  function getOtherUser() {
    if (props.currentChat.UserOneId === props.currentUser?.user.id) {
      return props.currentChat.UserTwoId;
    } else {
      return props.currentChat.UserOneId;
    }
  }

  async function handleSendMsg(msg: string) {
    if (props.socket.current) {
      props.socket.current.emit("send-msg", {
        to: getOtherUser(),
        from: props.currentUser?.user.id,
        convId: props.currentChat._id,
        msg,
      });
    }

    await myFetch({
      route: "/api/chats/messages/new",
      method: "POST",
      body: JSON.stringify({
        convId: props.currentChat._id,
        contentType: "text",
        userId: props.currentUser?.user.id,
        content: msg,
      }),
    });

    const newMessages = [...messages.messages];
    newMessages.push({
      id: newMessages.length + 1,
      senderId: props.currentUser?.user.id || "",
      contentType: "text",
      content: msg,
      dateTime: new Date().toISOString(),
      read: true,
    });
    setMessages({ messages: newMessages });
  }

  useEffect(() => {
    if (props.socket.current) {
      props.socket.current.on("msg-recieve", (msg: IMessage) => {
        console.log("msg recieved", msg);
        console.log("senderId", msg.senderId);
        console.log("getOtherUser()", getOtherUser());
        if (msg.senderId === getOtherUser()) {
          setArrivalMessage(msg);
        } else {
          // TODO: refresh the chat list
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => ({
        messages: [...prev.messages, arrivalMessage],
      }));
    }
  }, [arrivalMessage]);

  return (
    <div className="flex flex-col h-full w-full">
      <ChatUserBanner currentChat={props.currentChat} currentUser={props.currentUser} />
      <div className="flex flex-row w-full" style={{ height: "calc(100% - 6rem)" }}>
        <div
          className="flex flex-col h-full w-full"
          // className={`flex flex-col h-full ${
          //   showOrder && showRating ? "w-full" : "w-3/5"
          // }`} // TODO: choose 3/5 when there is an order betweeen the artist and the client
        >
          <ChatBox messages={messages} currentUser={props.currentUser} />
          <MessageInput handleSendMsg={handleSendMsg} />
        </div>
        {/* <div
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
        </div> */}
      </div>
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
