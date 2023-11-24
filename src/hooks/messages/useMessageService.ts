import { useState, useEffect } from "react";
import { IMessage, IMessages, IOrderInfos } from "../../interfaces/messages/messages";
import { ConversationService } from "./useConversationService";
import { myFetch } from "../../tools/myFetch";

export interface MessageService {
  messages: IMessages;
  orderInfos?: IOrderInfos;
  showOrder: boolean;
  showRating: boolean;
  fetchMessages: (convId: number | undefined) => void;
  sendMessage: (convId: number | undefined, messageToSend: string) => void;
  recieveMessage: (messageToAppend: IMessage) => void;
  closeOrder: () => void;
  closeRating: () => void;
  handleRating: (convId: number | undefined, rating: number) => void;
}

export function useMessageService(conversationService: ConversationService): MessageService {
  {/* c8 ignore start */}
  const [messages, setMessages] = useState<IMessages>({ messages: [] });
  const [orderInfos, setOrderInfos] = useState<IOrderInfos>();
  const [showOrder, setShowOrder] = useState(false);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    fetchMessages(conversationService.convSelected?.id || 0);
    fetchOrderInfo(conversationService.convSelected?.id || 0);
  }, [conversationService.convSelected?.id]);

  async function fetchOrderInfo(convId: number | undefined) {
    const res = await myFetch({
      route: "/api/conversations/order/infos",
      method: "POST",
      body: JSON.stringify({
        convId: convId,
      }),
    })
    const data = await res.json();
    if (res.status === 200) {
      setOrderInfos(data);
      if (data.orderState !== "none") {
        setShowOrder(true);
      }
      if (data.userRole === "buyer" && data.orderState === "accepted") {
        setShowRating(true);
      }
    } else {
      setOrderInfos(undefined);
      setShowOrder(false);
      setShowRating(false);
    }
    // const newOrderInfos: IOrderInfos = {
    //   orderPicture: "https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg",
    //   orderDescription: "Ceci est une description de cette oeuvvre d'art, elle est super belle ! Est-ce que tu veux l'acheter, alors appelle de 3630 et dit allo au père noel !",
    //   orderPrice: 100,
    //   userRole: "buyer",
    //   orderState: "accepted",
    //   orderRating: 0,
    // }
    // setOrderInfos(newOrderInfos);
    // setShowOrder(true);
    // if (newOrderInfos.userRole === "buyer" && newOrderInfos.orderState === "accepted") {
    //   setShowRating(true);
    // }
  }

  async function fetchMessages(convId: number | undefined) {
    const res = await myFetch({
      route: "/api/conversations/messages",
      method: "POST",
      body: JSON.stringify({
        convId: convId,
      }),
    })
    const data = await res.json();
    if (res.status === 200) {
      setMessages(data);
      console.log(data)
    } else {
      console.log("error");
    }
  }

  async function sendMessage(convId: number | undefined, messageToSend: string) {
    const res = await myFetch({
      route: "/api/conversations/messages/new",
      method: "POST",
      body: JSON.stringify({
        convId: convId,
        contentType: "text",
        sender: 0,
        content: messageToSend,
      }),
    })
    const data = await res.json();
    if (res.status === 200) {
      const newMessages: IMessages = {
        messages: [
          ...messages.messages,
          data.message,
        ],
      };
      setMessages(newMessages);
    } else {
      console.log("error");
    }
  }

  async function recieveMessage(messageToAppend: IMessage) {
    const newMessages: IMessages = {
      messages: [
        ...messages.messages,
        messageToAppend,
      ],
    };
    setMessages(newMessages);
  }

  async function handleRating(convId: number | undefined, rating: number) {
    console.log(convId, rating);
    const res = await myFetch({
      route: "/api/conversations/order/rating",
      method: "POST",
      body: JSON.stringify({
        convId: convId,
        rating: rating,
      }),
    })
    const data = await res.json();
    if (res.status === 200) {
      setOrderInfos(data.order);
    } else {
      console.log("error");
    }
  }

  function closeOrder() {
    setShowOrder(false);
  }

  function closeRating() {
    setShowRating(false);
  }

  return {
    messages,
    orderInfos,
    showOrder,
    showRating,
    fetchMessages,
    sendMessage,
    recieveMessage,
    closeOrder,
    closeRating,
    handleRating,
  };
  {/* c8 ignore stop */}
}
