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

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useConversationService() {
  {/* c8 ignore start */}
  const [conversations, setConversations] = useState<IConversations>({ conversations: [] });
  const [filteredConversations, setFilteredConversations] = useState<IConversations>({ conversations: [] });
  const [convSelected, setConvSelected] = useState<IConversation | undefined>(undefined);

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    const res = await fetch(NEXT_PUBLIC_BACKEND_URL + "/api/conversations", {
      method: "GET",
    });
    const data = await res.json();
    if (res.status === 200) {
      setConversations(data);
      setFilteredConversations(data);
      if (!convSelected && data.conversations[0]) {
        setConvSelected(data.conversations[0]);
      }
    } else {
      console.log("error");
    }
  };

  function selectConversation(id: number) {
    const selected = conversations.conversations.find((conv) => conv.id === id);
    if (selected) {
      setConvSelected(selected);
    }
    if (selected && selected.unreadMessages) {
      selected.unreadMessages = false;
      // const res = await fetch(NEXT_PUBLIC_BACKEND_URL + "/api/conversation/read", {
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
  {/* c8 ignore stop */}
}
