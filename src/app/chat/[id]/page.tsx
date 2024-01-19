import ChatWrapper from "../../../wrappers/chat/ChatWrapper";

export default function Page(props: { params: { id: string } }): JSX.Element {
  return (
    <ChatWrapper convId={props.params.id}></ChatWrapper>
  );
}
