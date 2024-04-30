import { ElementType } from "react";
import Button, { IButtonProps } from "./Button";

export interface ILinkButtonProps extends IButtonProps {
  href: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
  width?: string; // Nouvelle prop pour spécifier la largeur du bouton
}

export default function LinkButton({ link: Link, width = "auto", ...props }: ILinkButtonProps): JSX.Element {
  return (
    <Link href={props.href} className={props.className}>
      <Button
        type={props.type}
        color={props.color}
        onClick={props.onClick}
        loading={props.loading}
        className={`w-${width}`}
      >
        {props.children}
      </Button>
    </Link>
  );
}
