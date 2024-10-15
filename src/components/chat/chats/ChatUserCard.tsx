import { IChat } from "../../../interfaces/chat/chats";
import { IConnectedUser } from "../../../interfaces/user/user";
import { myFetch, NEXT_PUBLIC_BACKEND_URL } from "../../../tools/myFetch";
import MuteIcon from "@mui/icons-material/Notifications";
import UnmuteIcon from "@mui/icons-material/NotificationsOff";
import Delete from "@mui/icons-material/Delete";

import { useState } from "react";

export interface ChatUserCardProps {
  chat: IChat;
  currentUser: IConnectedUser | undefined;
  currentSelected: IChat | undefined;
  handleSelectChat: (chat: IChat) => void;
  handleDeleteChat: (chatId: string) => void;
}

export function ChatUserCard(props: ChatUserCardProps): JSX.Element {
  /* c8 ignore start */

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const mutedChats = JSON.parse(localStorage.getItem("mutedChats") || "{}");
    return mutedChats[props.chat._id] || false;
  });

  function onSelectChat() {
    props.handleSelectChat(props.chat);
  }

  function handleMuteToggle() {
    setIsMuted((prev) => {
      const newMutedState = !prev;

      const mutedChats = JSON.parse(localStorage.getItem("mutedChats") || "{}");
      mutedChats[props.chat._id] = newMutedState;
      localStorage.setItem("mutedChats", JSON.stringify(mutedChats));

      console.log("Mute/Unmute toggled", newMutedState);
      return newMutedState;
    });
  }

  async function handleDelete() {
    // const res = await myFetch({ route: `/api/conversations/delete/${props.chat._id}`, method: "DELETE" });
    // if (res.ok) {
    //   props.handleDeleteChat(props.chat._id);
    //   console.log("Chat deleted", props.chat._id);
    // } else {
    //   console.log("Failed to delete chat");
    // }
    const deletedChats = JSON.parse(localStorage.getItem("deletedChats") || "{}");
    deletedChats[props.chat._id] = true;
    localStorage.setItem("deletedChats", JSON.stringify(deletedChats));
    props.handleDeleteChat(props.chat._id);
    // console.log("Chat marked as deleted", props.chat._id);
  }

  return (
    <div className="pl-6 sm:pl-10">
      <div
        className={`relative flex flex-row flex-grow-0 w-full p-2 cursor-pointer rounded-l-full hover:bg-secondary group ${
          props.chat._id === props.currentSelected?._id ? "bg-secondary-hover" : ""
        }`}
        onClick={onSelectChat}
      >
        {props.chat.unreadMessages && !isMuted && props.chat.LastSenderId !== props.currentUser?.user.id && (
          <div className="absolute rounded-full w-3 h-3 bg-primary -left-4 top-1/2 transform -translate-y-1/2" />
        )}
        {(
          props.chat.UserOneId !== props.currentUser?.user.id ? props.chat.UserOnePicture : props.chat.UserTwoPicture
        ) ? (
          /* TODO: use <Image> next component */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`${NEXT_PUBLIC_BACKEND_URL}/api/${
              props.chat.UserOneId !== props.currentUser?.user.id
                ? props.chat.UserOnePicture
                : props.chat.UserTwoPicture
            }`}
            alt="profilePicture"
            className="w-16 h-16 rounded-full bg-secondary flex-shrink-0"
          />
        ) : (
          <span className="w-16 h-16 rounded-full bg-secondary flex-shrink-0"></span>
        )}
        <div className="flex flex-col justify-center flex-grow ml-4 text-tertiary">
          <span className="text-2xl tracking-wide truncate w-4/5">
            {props.chat.UserOneId !== props.currentUser?.user.id ? props.chat.UserOneName : props.chat.UserTwoName}
          </span>
          <div className="grid grid-cols-1">
            {props.chat._id !== props.currentSelected?._id ? (
              <span className="text-sm truncate">{props.chat.lastMessage}</span>
            ) : (
              <span className="text-md font-semibold">...</span>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleMuteToggle();
          }}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-hover hidden group-hover:block"
        >
          {isMuted ? <UnmuteIcon /> : <MuteIcon />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-hover hidden group-hover:block"
        >
          <Delete />
        </button>
        {props.chat._id === props.currentSelected?._id && (
          <div className="absolute right-0 top-0 w-1 h-full bg-primary" />
        )}
      </div>
    </div>
  );
}
/* c8 ignore stop */
