import PostDescription from "./PostDescription";
import PostTab from "./PostTab";
import Cameleon from "../../assets/cameleon.png";
import { Button } from "../lib";
import NewPostModalWrapper from "../../wrappers/posts/NewPostModalWrapper";

interface IPostsProps {
  activeTab: "latest" | "trends" | "myposts";
  src: { src: string };
}

export default function Posts(props: IPostsProps): JSX.Element {
  const src = Cameleon as unknown as { src: string };

  return (
    <div className="w-screen h-full bg-white flex justify-center">
      <div className="flex-1 xl:flex items-center justify-center hidden">
        <PostDescription activeTab={props.activeTab} src={props.src.src} />
      </div>
      <div className="flex-1 xl:hidden" />
      <div className="flex flex-col">
        <div className="flex-1 bg-secondary"></div>
        <div className="flex">
          <PostTab href="/posts/latest" title="Les plus récents" isActive={props.activeTab === "latest"} />
          <PostTab href="/posts/trends" title="Tendances" isActive={props.activeTab === "trends"} />
          <PostTab href="/posts/myposts" title="Mes posts" isActive={props.activeTab === "myposts"} />
        </div>
      </div>
      <div className="flex-1 xl:flex xl:flex-col gap-2 items-center justify-center hidden">
        <img src={src.src} alt="cameleon" />
        <NewPostModalWrapper />
      </div>
      <div className="xl:hidden flex items-center justify-center flex-1">
        <NewPostModalWrapper icon />
      </div>
    </div>
  );
}
