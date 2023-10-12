import { useState, useEffect } from "react";
import { IMessages } from "../../interfaces/messages/messages";

export interface MessageService {
  messages: IMessages;
  fetchMessages: (convId: number | undefined) => void;
  sendMessage: (convId: number | undefined, messageToSend: string) => void;
}

export function useMessageService(firstConvId: number | undefined) {
  const [messages, setMessages] = useState<IMessages>({ messages: [] });

  useEffect(() => {
    fetchMessages(firstConvId || 0);
  }, []);

  function fetchMessages(convId: number | undefined) {
    // const res = await fetch(BACKEND_URL + "/api/conversations", {
    //   method: "GET",
    //   body: JSON.stringify({
    //     convId: convId,
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

    if (convId === 0) {
      const newMessages: IMessages = {
        messages: [
          {
            id: 0,
            sender: 0,
            contentType: "text",
            content: "Salut",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 1,
            sender: 1,
            contentType: "text",
            content: "Salut ça va ?",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 2,
            sender: 0,
            contentType: "text",
            content: "Oui et toi",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 3,
            sender: 1,
            contentType: "text",
            content:
              "Tranquille je suis en train de développer cette page de messagerie et toi tu fais quoi ? blablabla bla bla blalblalbla blalblalbalblal blalbla bla bla b l blalblalblalbla",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 4,
            sender: 0,
            contentType: "text",
            content: "Bah moi je suis en train de jouer à Elden Ring mais je galère, le boss est trop fort.",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 5,
            sender: 1,
            contentType: "text",
            content: "Okay ca marche moi j'aime bien",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 6,
            sender: 0,
            contentType: "text",
            content: "Ouais ok ca marche",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 7,
            sender: 0,
            contentType: "text",
            content: "Eh oh",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 5,
            sender: 1,
            contentType: "text",
            content: "Okay ca marche moi j'aime bien",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 6,
            sender: 0,
            contentType: "text",
            content: "Ouais ok ca marche",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 7,
            sender: 0,
            contentType: "text",
            content: "Eh oh",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 8,
            sender: 0,
            contentType: "text",
            content: "Hey, tu veux sortir ce soir ?",
            dateTime: "2021-03-20T13:00:00",
            read: true,
          },
          {
            id: 9,
            sender: 1,
            contentType: "text",
            content: "Désolé, je travaille sur un projet d'école en ce moment.",
            dateTime: "2021-03-20T13:05:00",
            read: true,
          },
          {
            id: 10,
            sender: 0,
            contentType: "text",
            content: "Pas de soucis, bonne chance avec ton projet !",
            dateTime: "2021-03-20T13:10:00",
            read: true,
          },
          {
            id: 11,
            sender: 1,
            contentType: "text",
            content: "Merci ! On se voit plus tard alors.",
            dateTime: "2021-03-20T13:15:00",
            read: true,
          },
          {
            id: 12,
            sender: 0,
            contentType: "text",
            content: "Oui, à plus tard !",
            dateTime: "2021-03-21T13:20:00",
            read: true,
          },
          {
            id: 13,
            sender: 1,
            contentType: "text",
            content: "Tu as vu le dernier épisode de la série ?",
            dateTime: "2021-03-21T13:25:00",
            read: true,
          },
          {
            id: 14,
            sender: 0,
            contentType: "text",
            content: "Non, ne me spoile pas !",
            dateTime: "2021-03-21T16:30:00",
            read: true,
          },
          {
            id: 15,
            sender: 1,
            contentType: "text",
            content: "Promis, je ne dirai rien !",
            dateTime: "2021-03-21T16:35:00",
            read: true,
          },
          {
            id: 16,
            sender: 0,
            contentType: "text",
            content: "Super, merci !",
            dateTime: "2021-03-21T19:40:00",
            read: true,
          },
          {
            id: 17,
            sender: 1,
            contentType: "text",
            content: "De rien, passe une bonne journée !",
            dateTime: "2021-03-21T23:45:00",
            read: true,
          },
        ],
      };
      setMessages(newMessages);
    } else {
      const newMessages: IMessages = {
        messages: [
          {
            id: 0,
            sender: 0,
            contentType: "text",
            content: "Coucou",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 1,
            sender: 1,
            contentType: "text",
            content: "Je veux pas te parler tu fais des peintures moches toi",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 2,
            sender: 0,
            contentType: "text",
            content: "Mais pourquoi tu veux pas me parler ?",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 3,
            sender: 1,
            contentType: "text",
            content: "Je sais pas c'est pas beau ce que tu fais alors je ne veux pas te parler !!!",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
          {
            id: 4,
            sender: 0,
            contentType: "text",
            content: "Ok...",
            dateTime: "2021-03-20T12:00:00",
            read: true,
          },
        ],
      };
      setMessages(newMessages);
    }
  }

  function sendMessage(convId: number | undefined, messageToSend: string) {
    // const res = await fetch(BACKEND_URL + "/api/conversations", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     convId: conversationId,
    //     message: messageToSend,
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
    const newMessages: IMessages = {
      messages: [
        ...messages.messages,
        {
          id: 50,
          sender: 0,
          contentType: "text",
          content: messageToSend,
          dateTime: "2021-03-20T12:00:00",
          read: true,
        },
      ],
    };
    setMessages(newMessages);
  }

  return {
    messages,
    fetchMessages,
    sendMessage,
  };
}
