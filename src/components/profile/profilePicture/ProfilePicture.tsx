import { cn } from "../../../tools/cn";
import ModifiableImage from "../../single-art-page/ModifiableImage";

export interface IProfilePictureProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  modifiable?: boolean;
  style?: React.CSSProperties;
}

export default function ProfilePicture(props: IProfilePictureProps): JSX.Element {
  if (props.modifiable) {
    return (
      <ModifiableImage
        className={cn("rounded-full border-4", props.className)}
        imageClassName={cn("rounded-full", props.imageClassName)}
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
      className={cn("rounded-full border-4", props.imageClassName)}
      alt="profilePicture"
      src={props.src}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
      style={props.style}
    />
  );
}
