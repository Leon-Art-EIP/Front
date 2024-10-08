import { ChatProvider } from "../../../contexts/ChatContext";
import ChatWrapper from "../../../wrappers/chat/ChatWrapper";

export default function Page(props: { params: { id: string } }): JSX.Element {
  return (
    <ChatProvider>
      <ChatWrapper convId={props.params.id}></ChatWrapper>
    </ChatProvider>
  );
}
