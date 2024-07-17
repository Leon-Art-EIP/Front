import Latest from "../../assets/new.png";

interface IPostDescriptionProps {
  activeTab: "latest" | "trends" | "myposts";
  src: string;
}

export default function PostDescription(props: IPostDescriptionProps): JSX.Element {
  let text = "Les posts les plus récents";

  if (props.activeTab === "trends") {
    text = "Les posts les plus aimés ces dernières 24h";
  } else if (props.activeTab === "myposts") {
    text = "Tous vos posts";
  }

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <h1 className="text-4xl text-primary text-center max-w-xs">{text}</h1>
      <img src={props.src} alt="posts-tab-status" className="h-16 w-16" />
    </div>
  );
}
