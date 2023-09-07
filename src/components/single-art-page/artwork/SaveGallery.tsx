import Collections, { ICollectionsProps } from "./Collections";

export default function SaveGallery(props: ICollectionsProps): JSX.Element {
  return (
    <div className="p-5 rounded-3xl flex flex-col">
      <div className="flex"></div>
      <Collections collections={props.collections} />
    </div>
  );
}
