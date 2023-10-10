import { useState, useEffect } from 'react';
import { IMessages } from "../../interfaces/messages/messages";

export interface MessageService {
  messages: IMessages;
  fetchMessages: (conversationId: number) => void;
}

export function useMessageService(firstConvId: number | undefined) {

  const [messages, setMessages] = useState<IMessages>({ messages: [] });

  useEffect(() => {
    fetchMessages(firstConvId || 0);
  }, []);

  function fetchMessages(conversationId: number) {
    // const res = await fetch(BACKEND_URL + "/api/conversations", {
    //   method: "GET",
    //   body: JSON.stringify({
    //     convId: conversationId,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await res.json();
    // if (res.status === 200) {
    //   this.conversations = data;
    // } else {
    //   console.log("error");
    // }

    if (conversationId === 0) {
      const newMessages: IMessages = {
      messages: [
        {
          id: 0,
          sender: 0,
          contentType: "text",
          content: "Salut",
          date: "2021-03-20T12:00:00",
          read: true,
        },
        {
          id: 1,
          sender: 1,
          contentType: "text",
          content: "Salut ça va ?",
          date: "2021-03-20T12:00:00",
          read: true,
        },
        {
          id: 2,
          sender: 0,
          contentType: "text",
          content: "Oui et toi",
          date: "2021-03-20T12:00:00",
          read: true,
        },
        {
          id: 3,
          sender: 1,
          contentType: "text",
          content: "Tranquille je suis en train de développer cette page de messagerie et toi tu fais quoi ?",
          date: "2021-03-20T12:00:00",
          read: true,
        },
        {
          id: 4,
          sender: 0,
          contentType: "text",
          content: "Bah moi je suis en train de jouer à Elden Ring mais je galère, le boss est trop fort.",
          date: "2021-03-20T12:00:00",
          read: true,
        },
        {
          id: 5,
          sender: 1,
          contentType: "text",
          content: "Salut",
          date: "2021-03-20T12:00:00",
          read: true,
        },
      ],
      };
      setMessages(newMessages);
    } else if (conversationId === 1) {
      const newMessages: IMessages = {
        messages: [
          {
            id: 0,
            sender: 0,
            contentType: "text",
            content: "Coucou",
            date: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 1,
            sender: 1,
            contentType: "text",
            content: "Je veux pas te parler tu fais des peintures moches toi",
            date: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 2,
            sender: 0,
            contentType: "text",
            content: "Mais pourquoi tu veux pas me parler ?",
            date: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 3,
            sender: 1,
            contentType: "text",
            content: "Je sais pas c'est pas beau ce que tu fais alors je ne veux pas te parler !!!",
            date: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 4,
            sender: 0,
            contentType: "text",
            content: "Ok...",
            date: "2021-03-20T12:00:00",
            read: true,
          },
        ],
        };
        setMessages(newMessages);
      }
  }
  

  return {
    messages,
    fetchMessages,
  };
}
