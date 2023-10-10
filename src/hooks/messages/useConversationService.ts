import { useState, useEffect } from 'react';
import { IConversation, IConversations } from "../../interfaces/messages/conversations";

export interface ConversationService {
  conversations: IConversations;
  filteredConversations: IConversations;
  convSelected: IConversation | undefined;
  fetchConversations: () => void;
  filterConversations: (search: string) => void;
  selectConversation: (id: number) => void;
}

export function useConversationService() {
  const [conversations, setConversations] = useState<IConversations>({ conversations: [] });
  const [filteredConversations, setFilteredConversations] = useState<IConversations>({ conversations: [] });
  const [convSelected, setConvSelected] = useState<IConversation | undefined>(undefined);

  useEffect(() => {
    fetchConversations();
  }, []);

  function fetchConversations() {
    // const res = await fetch(BACKEND_URL + "/api/conversations", {
    //   method: "POST",
    // });
    // const data = await res.json();
    // if (res.status === 200) {
    //   this.conversations = data;
    // } else {
    //   console.log("error");
    // }

    // TODO: remove this when backend is ready
    const newConversations: IConversations = {
      conversations: [
        {
          id: 0,
          profileName: "Damien Demontis",
          profilePricture: "",
          lastMessage: "",
          unreadMessages: false,
        },
        {
          id: 1,
          profileName: "Evan Keolhard",
          profilePricture: "",
          lastMessage: "Coucou",
          unreadMessages: false,
        },
        {
          id: 2,
          profileName: "Vivant Lagarrigue",
          profilePricture: "",
          lastMessage: "On se fait un fifa ? test  test test test test test test test test test test test",
          unreadMessages: true,
        },
      ],
    };
    setConversations(newConversations);
    setFilteredConversations(newConversations);
    setConvSelected(newConversations.conversations[0]);
  };

  function selectConversation(id: number) {
    const selected = conversations.conversations.find((conv) => conv.id === id);
    if (selected) {
      setConvSelected(selected);
    }
    if (selected && selected.unreadMessages) {
      selected.unreadMessages = false;
      // const res = await fetch(BACKEND_URL + "/api/conversation/read", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ id: id }),
      // });
      // if (res.status !== 200) {
      //   console.log("error");
      // }
    }
  };

  function filterConversations(search: string) {
    const filtered = conversations.conversations.filter((conv) => conv.profileName.toLowerCase().includes(search.toLowerCase()));
    setFilteredConversations({ conversations: filtered });
  }

  return {
    conversations,
    filteredConversations,
    convSelected,
    fetchConversations,
    filterConversations,
    selectConversation,
  };
}
