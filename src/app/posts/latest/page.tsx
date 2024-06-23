import Posts from "../../../components/posts/Posts";
import Latest from "../../../assets/new.png";

export default function Page(): JSX.Element {
  return <Posts activeTab="latest" src={Latest as unknown as { src: string }} />;
}
