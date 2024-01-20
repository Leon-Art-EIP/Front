import React from "react";
import { IArtPublications } from "../../interfaces/gallery/artPublications";
import { useRouter } from "next/navigation";

interface Gallery4x4Props {
  artPublications: IArtPublications;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Gallery4x4(props: Gallery4x4Props): JSX.Element {
  const router = useRouter();

  function handleClickOnArtPublication(index: number) {
    router.push(`/single/${props.artPublications.artPublications[index]._id}`);
  }

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8 place-items-center mx-auto">
      {props.artPublications.artPublications.map((artPublication, index) => (
        <div
          key={index}
          className="md:w-72 w-52 md:h-72 h-52 rounded-xl bg-gray-400 shadow-xl overflow-hidden hover:scale-[1.03] hover:opacity-75 duration-300 hover:shadow-2xl transition ease-in-out cursor-pointer"
          onClick={() => handleClickOnArtPublication(index)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${NEXT_PUBLIC_BACKEND_URL}/api/${artPublication.image}`}
            alt="art"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}
