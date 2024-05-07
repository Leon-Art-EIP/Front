export interface IMessage {
  id: number;
  senderId: string;
  contentType: "text" | "image";
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