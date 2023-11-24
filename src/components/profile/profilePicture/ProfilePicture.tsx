import Image from "next/image";

export interface IProfilePictureProps {
  src: string;
}

export default function ProfilePicture(props: IProfilePictureProps): JSX.Element {
  return <Image className="h-full rounded-full border-white border-4" alt="profilePicture" src={props.src} />;
}
