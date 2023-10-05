interface IPicturesProps {
  pictures: string[];
}

export default function Pictures(props: IPicturesProps): JSX.Element {
  return (
    <div className="grid grid-cols-4 gap-8 place-items-center justify-center mt-8 mx-4">
      {props.pictures.map((url, index) => (
        <div key={index} className="w-55 h-55 rounded-xl overflow-hidden bg-slate-300">
          <img src={url} alt="art" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
