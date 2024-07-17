import Posts from "../../../components/posts/Posts";
import Tendance from "../../../assets/tendance.png";

export default function Page(): JSX.Element {
  return <Posts activeTab="trends" src={Tendance as unknown as { src: string }} />;
}
