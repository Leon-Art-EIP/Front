interface IPicturesProps {
  pictures: string[];
}

export default function Pictures(props: IPicturesProps): JSX.Element {
  return (
    <div className="bg-background grid grid-cols-4 gap-8 place-items-center justify-center py-4 px-4">
      {props.pictures.map((url, index) => (
        <div
        key={index}
        className="w-full aspect-square rounded-xl overflow-hidden"
      >
        <img
          src={url}
          alt="art"
          className="w-full h-full object-cover"
        />
      </div>
      ))}
    </div>
  );
}
