import { ElementType } from "react";
import ProfilePicture from "../../profile/profilePicture/ProfilePicture";

interface INamedProfilePictureProps {
  src: string;
  name: string;
  id: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

/* c8 ignore start */

export default function NamedProfilePicture({ link: Link, ...props }: INamedProfilePictureProps): JSX.Element {
  return (
    <Link href={`/profile/${props.id}`} className="rounded-lg p-2 hover:bg-secondaryGrey">
      <div className="flex flex-col gap-2 text-center">
        <div className="h-32 w-32">
          <ProfilePicture src={props.src} width={128} height={128} />
        </div>
        <div className="font-semibold">{props.name}</div>
      </div>
    </Link>
  );
}

/* c8 ignore stop */
