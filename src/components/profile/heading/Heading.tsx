import Image from "next/image";
import ProfilePicture from "../profilePicture/ProfilePicture";

interface IHeadingProps {
  profilePicture: string;
  banner: string;
}

export default function Heading(props: IHeadingProps): JSX.Element {
  return (
    <div className="grid grid-cols-4 relative h-64">
      <Image src={props.banner} alt="profileBanner" className="absolute h-64 z-0" />
      <div></div>
      <div></div>
      <div></div>
      <div className="z-10 h-full flex items-center justify-center p-5">
        <ProfilePicture src={props.profilePicture} width={200} height={200} />
      </div>
    </div>
  );
}
