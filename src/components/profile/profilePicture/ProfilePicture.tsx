import Image from "next/image";

export interface IProfilePictureProps {
  src: string;
}

export default function ProfilePicture(props: IProfilePictureProps): JSX.Element {
  return <Image className="w-52 h-52 rounded-full border-white border-4" alt="profilePicture" src={props.src} />;
}
