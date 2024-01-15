import { ElementType } from "react";
import Button, { IButtonProps } from "./Button";

export interface ILinkButtonProps extends IButtonProps {
  href: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function LinkButton({ link: Link, ...props }: ILinkButtonProps): JSX.Element {
  return (
    <Link href={props.href} className={props.className}>
      <Button type={props.type} color={props.color} onClick={props.onClick} loading={props.loading}>
        {props.children}
      </Button>
    </Link>
  );
}
