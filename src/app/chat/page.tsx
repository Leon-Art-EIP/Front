import ChatWrapper from "../../wrappers/chat/ChatWrapper";
import { ChatProvider } from "../../contexts/ChatContext";

export default function Page(): JSX.Element {
  return (
    <ChatProvider>
      <ChatWrapper convId={undefined} />
    </ChatProvider>
  );
}
