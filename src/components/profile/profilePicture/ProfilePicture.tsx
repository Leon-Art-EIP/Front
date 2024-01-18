import Image from "next/image";

export interface IProfilePictureProps {
  src: string;
  width?: number;
  height?: number;
}

export default function ProfilePicture(props: IProfilePictureProps): JSX.Element {
  return (
    <Image
      className="h-full rounded-full border-white border-4 bg-white"
      alt="profilePicture"
      src={props.src}
      width={props.width}
      height={props.height}
    />
  );
}
