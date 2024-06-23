import Posts from "../../../components/posts/Posts";
import Ecrire from "../../../assets/ecrire.png";

export default function Page(): JSX.Element {
  return <Posts activeTab="myposts" src={Ecrire  as unknown as { src: string }} />;
}
