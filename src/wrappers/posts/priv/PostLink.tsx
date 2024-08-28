import Link from "next/link";
import { cn } from "../../../tools/cn";

interface IPostLinkProps {
  title: "Récents" | "Popularité" | "Mes posts";
  href: "/posts/recent" | "/posts/popular" | "/posts/user";
  active: boolean;
}

export default function PostLink(props: IPostLinkProps): JSX.Element {
  return (
    <Link href={props.href} className={cn("text-2xl", props.active && "underline")}>
      {props.title}
    </Link>
  );
}
