import ProfilePicture from "../profilePicture/ProfilePicture";

interface IHeadingProps {
  profilePicture: string;
  banner: string | { src: string };
}

export default function Heading(props: IHeadingProps): JSX.Element {
  const src = typeof props.banner === "string" ? props.banner : props.banner.src;

  return (
    <div className="shrink-0 relative h-64">
      <div className="z-10 flex items-center lg:justify-end justify-center lg:mx-28 h-full">
        <ProfilePicture
          src={props.profilePicture}
          width={192}
          height={192}
          imageClassName="z-10 w-48 h-48 object-contain bg-black"
        />
      </div>
      <img
        src={src}
        alt="profileBanner"
        className="absolute inset-0 h-64 z-0 w-screen object-contain bg-secondary"
        height={256}
      />
    </div>
  );
}
