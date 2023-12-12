export interface IChats {
  chats: IChat[];
}

export interface IChat {
  _id: string;
  lastMessage: string;
  unreadMessages: boolean;
  UserOneId: string;
  UserOneName: string;
  UserOnePicture: string;
  UserTwoId: string;
  UserTwoName: string;
  UserTwoPicture: string;
}
