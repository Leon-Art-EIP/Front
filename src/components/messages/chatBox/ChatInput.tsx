import { useState } from "react";
import { ConversationService } from "../../../hooks/messages/useConversationService";
import { MessageService } from "../../../hooks/messages/useMessageService";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";

export interface ChatInputProps {
  conversationService: ConversationService;
  messageService: MessageService;
}
export function ChatInput(props: ChatInputProps): JSX.Element {
  {/* c8 ignore start */}
  const [messageToSend, setMessageToSend] = useState("");

  function onSendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (messageToSend === "") return;

    props.messageService.sendMessage(props.conversationService.convSelected?.id, messageToSend);
    setMessageToSend("");
  }

  return (
    <div className="flex justify-center items-center h-24">
      <form
        onSubmit={onSendMessage}
        className="flex flex-row gap-4 justify-between bg-[#F3F3F3] w-full rounded-full mx-4 my-2"
      >
        <button type="button" className="bg-[#FFE3E3] p-3 rounded-full h-full text-center">
          <AttachmentIcon className="h-7 w-7 rotate-45 fill-[#e11c0a]" />
        </button>
        <input
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Votre message..."
          className="w-full bg-inherit outline-none placeholder:text-[#7d7d7d]"
        />
        <button type="submit" className="bg-[#E3F3FF] p-3 rounded-full h-full text-center">
          <SendIcon className="h-7 w-7 fill-[#6db1e3]" />
        </button>
      </form>
    </div>
  );
  {/* c8 ignore stop */}
}
