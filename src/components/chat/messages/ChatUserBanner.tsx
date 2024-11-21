import { IChat } from "../../../interfaces/chat/chats";
import { IConnectedUser } from "../../../interfaces/user/user";
import { NEXT_PUBLIC_BACKEND_URL } from "../../../tools/myFetch";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export interface ChatUserBannerProps {
  currentChat: IChat;
  currentUser: IConnectedUser | undefined;
}

export function ChatUserBanner(props: ChatUserBannerProps): JSX.Element {
  const router = useRouter(); // Initialize useRouter

  const isUserOne = props.currentChat.UserOneId !== props.currentUser?.user.id;
  const profileUrl = isUserOne
    ? `${NEXT_PUBLIC_BACKEND_URL}/api/${props.currentChat.UserOnePicture}`
    : `${NEXT_PUBLIC_BACKEND_URL}/api/${props.currentChat.UserTwoPicture}`;
  const profileName = isUserOne ? props.currentChat.UserOneName : props.currentChat.UserTwoName;
  const profileId = isUserOne ? props.currentChat.UserOneId : props.currentChat.UserTwoId;

  function handleClickOnOtherUser() {
    router.push(`/profile/${profileId}`);
  }

  return (
    <div className="flex flex-row h-24 p-4 items-center gap-4 shadow-[0px_2px_7px_0px_rgba(170,170,170)] z-10 text-tertiary">
      <button onClick={handleClickOnOtherUser} className="flex items-center gap-4">
        {profileUrl ? (
          /* TODO: use <Image> next component */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={profileUrl} alt="profilePicture" className="w-16 h-16 rounded-full bg-secondary flex-shrink-0" />
        ) : (
          <span className="w-16 h-16 rounded-full bg-secondary flex-shrink-0"></span>
        )}
        <span className="text-2xl">{profileName}</span>
      </button>
    </div>
  );
}
