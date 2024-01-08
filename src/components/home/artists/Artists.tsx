import { ElementType } from "react";
import { IArtist } from "../../../interfaces/home/artist";
import NamedProfilePicture from "./NamedProfilePicture";

export interface IArtistsProps {
  artists: IArtist[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Artists(props: IArtistsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="text-xl font-semibold">Artistes {`>`}</div>
      <div className="flex gap-4 overflow-x-auto">
        {props.artists.map((artist) => {
          return (
            <NamedProfilePicture
              key={`artist-${artist._id}`}
              name={artist.username}
              src={artist.profilePicture}
              id={artist._id}
              link={props.link}
            />
          );
        })}
      </div>
    </div>
  );
}
