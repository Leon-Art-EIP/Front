export interface IMessages {
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  sender: number;
  contentType: string;
  content: string;
  date: string;
  read: boolean;
}