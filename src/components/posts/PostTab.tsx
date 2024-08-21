import Link from "next/link";
import { cn } from "../../tools/cn";

interface IPostTabProps {
  href: string;
  title: string;
  isActive: boolean;
}

export default function PostTab(props: IPostTabProps): JSX.Element {
  return (
    <Link
      href={props.href}
      className={cn(
        "py-2 px-4 text-primary w-64 text-center border-t border-black",
        props.isActive ? "bg-secondary text-primary text-2xl" : "text-tertiary text-xl"
      )}
    >
      {props.title}
    </Link>
  );
}
