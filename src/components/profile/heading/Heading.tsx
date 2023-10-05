import Image from "next/image";
import profileHeading from "../../../assets/profileHeading.png";
import profilePicture from "../../../assets/profilePicture.png";
import ProfilePicture from "../profilePicture/ProfilePicture";

export default function Heading(): JSX.Element {
  return (
    <div className="grid grid-cols-4 relative h-64">
      <Image src={profileHeading} alt="profileHeading" className="absolute h-64 z-0" />
      <div></div>
      <div></div>
      <div></div>
      <div className="z-10 h-full flex items-center justify-center">
        <ProfilePicture src={profilePicture} />
      </div>
    </div>
  );
}
