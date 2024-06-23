import PostDescription from "./PostDescription";
import PostTab from "./PostTab";
import Cameleon from "../../assets/cameleon.png";

interface IPostsProps {
  activeTab: "latest" | "trends" | "myposts";
  src: { src: string };
}

export default function Posts(props: IPostsProps): JSX.Element {
  return (
    <div className="w-screen h-full bg-white flex">
      <div className="flex-1 flex items-center justify-center">
        <PostDescription activeTab={props.activeTab} src={props.src.src} />
      </div>
      <div className="flex flex-col">
        <div className="flex-1 bg-secondary"></div>
        <div className="flex">
          <PostTab href="/posts/latest" title="Les plus récents" isActive={props.activeTab === "latest"} />
          <PostTab href="/posts/trends" title="Tendances" isActive={props.activeTab === "trends"} />
          <PostTab href="/posts/myposts" title="Mes posts" isActive={props.activeTab === "myposts"} />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src={Cameleon.src} alt="cameleon" />
      </div>
    </div>
  );
}
