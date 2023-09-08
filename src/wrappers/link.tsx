import NLink from "next/link";
import { ReactNode } from "react";

export interface ILinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Link(props: ILinkProps): JSX.Element {
  return (
    <NLink href={props.href} className={props.className} id={props.id}>
      {props.children}
    </NLink>
  );
}
