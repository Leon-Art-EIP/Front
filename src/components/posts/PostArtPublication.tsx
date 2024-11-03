import Link from "next/link";
import { imageApi } from "../../tools/variables";

interface IPostArtPublicationProps {
  artPublication: {
    _id: string;
    image: string | undefined;
  };
}

export default function PostArtPublication(props: IPostArtPublicationProps): JSX.Element {
  let children: JSX.Element;

  if (props.artPublication) {
    children = (
      <img
        alt="art"
        src={`${imageApi}/${props.artPublication.image}`}
        className="h-32 rounded-2xl object-cover w-full"
      />
    );
  } else {
    children = <p>Voir publication</p>;
  }

  return <Link href={`/single/${props.artPublication._id}`}>{children}</Link>;
}
