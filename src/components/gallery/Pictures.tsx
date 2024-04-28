// import Image from "next/image";

interface IPicturesProps {
  pictures: string[];
}

export default function Pictures(props: IPicturesProps): JSX.Element {
  return (
    <div className="bg-background grid grid-cols-4 gap-8 place-items-center justify-center py-4 px-4">
      {props.pictures.map((url, index) => (
        <div key={index} className="w-55 h-55 rounded-xl overflow-hidden bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="art" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
