import { ElementType } from "react";
import Arts from "./Arts";

export interface IForYouProps {
  forYouArts: { image: string; _id: string }[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function ForYou(props: IForYouProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold">Pour vous {`>`}</div>
      <Arts arts={props.forYouArts} link={props.link} />
    </div>
  );
}
