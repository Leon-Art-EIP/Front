import HomeWrapper from "../wrappers/home/HomeWrapper";
import "./globals.css";

export default async function Page(): Promise<JSX.Element> {
  return (
    <div>
      <HomeWrapper />
      <footer></footer>
    </div>
  );
}
