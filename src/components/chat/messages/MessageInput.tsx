import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export interface MessageInputProps {
  handleSendMsg: (msg: string) => void;
}
export function MessageInput(props: MessageInputProps): JSX.Element {
  {
    /* c8 ignore start */
  }
  const [messageToSend, setMessageToSend] = useState("");

  function onSendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (messageToSend === "") return;
    props.handleSendMsg(messageToSend);
    setMessageToSend("");
  }

  return (
    <div className="flex justify-center items-center h-24">
      <form
        onSubmit={onSendMessage}
        className="flex flex-row gap-4 justify-between bg-background-hl w-full rounded-full mx-4 my-2"
      >
        <button type="button" className="bg-secondary-hover p-3 rounded-full h-full text-center">
          <AttachmentIcon className="h-7 w-7 rotate-45 fill-[#e11c0a]" />
        </button>
        <input
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Votre message..."
          className="text-tertiary w-full bg-inherit outline-none placeholder:text-secondary"
        />
        <button type="submit" className="bg-secondary-hover p-3 rounded-full h-full text-center">
          <SendIcon className="h-7 w-7 fill-background" />
        </button>
      </form>
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
