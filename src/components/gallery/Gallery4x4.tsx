import React from 'react';
import { IArtPublications } from "../../interfaces/gallery/artPublications";

interface Gallery4x4Props {
  artPublications: IArtPublications;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Gallery4x4(props: Gallery4x4Props): JSX.Element {
  return (
    <div className="grid grid-cols-4 gap-8 place-items-center justify-center py-4 px-4">
      {props.artPublications.artPublications.map((artPublication, index) => (
        <div key={index} className="w-55 h-55 rounded-xl overflow-hidden bg-slate-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${NEXT_PUBLIC_BACKEND_URL}/api/${artPublication.image}`} alt="art" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}