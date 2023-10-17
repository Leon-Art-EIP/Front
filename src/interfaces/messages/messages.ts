export interface IMessages {
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  sender: 0 | 1;
  contentType: string;
  content: string;
  dateTime: string;
  read: boolean;
}

export interface IOrderInfos {
  userRole: string;
  orderState: string;
  orderRating: number;
  orderPicture: string;
  orderDescription: string;
  orderPrice: number;
}