import { IChat } from "../../../interfaces/chat/chats";
import { IConnectedUser } from "../../../interfaces/user/user";
import { NEXT_PUBLIC_BACKEND_URL } from "../../../tools/myFetch";

export interface ChatUserBannerProps {
  currentChat: IChat;
  currentUser: IConnectedUser | undefined;
}

export function ChatUserBanner(props: ChatUserBannerProps): JSX.Element {
  {
    /* c8 ignore start */
  }
  return (
    <div className="flex flex-row h-24 p-4 items-center gap-4 shadow-[0px_2px_7px_0px_rgba(170,170,170)] z-10 text-tertiary">
      {(
        props.currentChat.UserOneId !== props.currentUser?.user.id
          ? props.currentChat.UserOnePicture
          : props.currentChat.UserTwoPicture
      ) ? (
        /* TODO: use <Image> next component */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`${NEXT_PUBLIC_BACKEND_URL}/api/${
            props.currentChat.UserOneId !== props.currentUser?.user.id
              ? props.currentChat.UserOnePicture
              : props.currentChat.UserTwoPicture
          }`}
          alt="profilePicture"
          className="w-16 h-16 rounded-full bg-secondary flex-shrink-0"
        />
      ) : (
        <span className="w-16 h-16 rounded-full bg-secondary flex-shrink-0"></span>
      )}
      <span className="text-2xl">
        {props.currentChat.UserOneId !== props.currentUser?.user.id
          ? props.currentChat.UserOneName
          : props.currentChat.UserTwoName}
      </span>
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
