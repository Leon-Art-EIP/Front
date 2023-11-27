export interface IChats {
  conversations: IChat[];
}

export interface IChat {
  id: number;
  profileName: string;
  profilePricture: string;
  lastMessage: string;
  unreadMessages: boolean;
}
