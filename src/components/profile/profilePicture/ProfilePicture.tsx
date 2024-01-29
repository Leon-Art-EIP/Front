import Image from "next/image";
import { cn } from "../../../tools/cn";
import ModifiableImage from "../../single-art-page/ModifiableImage";

export interface IProfilePictureProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  modifiable?: boolean;
  style?: React.CSSProperties;
}

/* c8 ignore start */

export default function ProfilePicture(props: IProfilePictureProps): JSX.Element {
  if (props.modifiable) {
    return (
      <ModifiableImage
        className={cn("h-full rounded-full border-white border-4 bg-white", props.className)}
        imageClassName="h-full rounded-full"
        hoverClassName="rounded-full"
        alt="profilePicture"
        src={props.src}
        width={props.width}
        height={props.height}
        onClick={props.onClick}
      />
    );
  }

  return (
    <img
      className={cn("h-full rounded-full border-white border-4 bg-white", props.className)}
      alt="profilePicture"
      src={props.src}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
      style={props.style}
    />
  );
}

/* c8 ignore stop */
