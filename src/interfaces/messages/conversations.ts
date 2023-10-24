export interface IConversations {
  conversations: IConversation[];
}

export interface IConversation {
  id: number;
  profileName: string;
  profilePricture: string;
  lastMessage: string;
  unreadMessages: boolean;
}
