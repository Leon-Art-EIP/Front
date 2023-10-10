import { useEffect } from "react";
import { IConversation } from "../../../interfaces/messages/conversations";

export interface UserCardProps {
  data: IConversation;
  selected: boolean;
  handleSelectConv: (id: number) => void;
}

export function UserCard(props: UserCardProps): JSX.Element {
  
  function onSelectConv() {
    props.handleSelectConv(props.data.id);
  }

  return (
    <div className="pl-6 sm:pl-10">
      <div
        className={`relative flex flex-row flex-grow-0 w-full p-2 cursor-pointer rounded-l-full hover:bg-gray-200 ${props.selected ? "bg-white" : ""}`}
        onClick={onSelectConv}
      >
        {props.data.unreadMessages && (
          <div className="absolute rounded-full w-3 h-3 bg-[#E11C0A] -left-4 top-1/2 transform -translate-y-1/2" />
        )}
        {props.data.profilePricture ? (
          <img
            src={props.data.profilePricture}
            alt="profilePicture"
            className="w-16 h-16 rounded-full bg-gray-500 flex-shrink-0"
          />
        ) : (
          <span className="w-16 h-16 rounded-full bg-gray-400 flex-shrink-0"></span>
        )}
        <div className="flex flex-col justify-center flex-grow ml-4">
          <span className="text-2xl tracking-wide truncate w-4/5">{props.data.profileName}</span>
          <div className="grid grid-cols-1">
            {props.data.lastMessage ? (
              <span className="text-sm truncate">{props.data.lastMessage}</span>
            ) : (
              <span className="text-sm text-gray-600 italic">Pas de message</span>
            )}
          </div>
        </div>
        {props.selected && <div className="absolute right-0 top-0 w-1 h-full bg-[#E11C0A]" />}
      </div>
    </div>
  );
}
