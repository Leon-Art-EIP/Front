import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export interface MessageInputProps {
  handleSendMsg: (msg: string) => void;
}
export function MessageInput(props: MessageInputProps): JSX.Element {
  const [messageToSend, setMessageToSend] = useState("");

  function onSendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (messageToSend === "") return;
    props.handleSendMsg(messageToSend);
    setMessageToSend("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(e as unknown as React.FormEvent);
    }
  }

  return (
    <form onSubmit={onSendMessage} className="flex justify-center items-end w-full gap-4 px-6 pb-6 pt-2 xl:px-10 xl:pb-6 xl:pt-2">
      <textarea
        value={messageToSend}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMessageToSend(e.target.value)}
        placeholder="Votre message..."
        className="text-tertiary w-full bg-background-inputfield outline-none placeholder:text-tertiary placeholder:opacity-50 resize-y overflow-y-auto rounded-3xl px-8 py-4"
        style={{ height: "3.5rem", minHeight: "3.5rem", maxHeight: "14rem" }}
      />
      <button type="submit" className="bg-quaternary-hover p-3 rounded-full text-center">
        <SendIcon className="h-7 w-7 fill-quaternary" />
      </button>
    </form>
  );
}