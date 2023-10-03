export interface IInfosProps {
  artistName: string;
  artistDescription: string;
  numberOfFollowers: number;
  numberOfPosts: number;
}

export default function Infos(props: IInfosProps): JSX.Element {
  return (
    <div className="h-full bg-secondaryGrey p-4 inline-flex flex-col gap-2 justify-center">
      <div className="font-medium text-2xl">{props.artistName}</div>
      <div className="bg-[#4E4E4E] rounded-2xl font-semibold px-5 py-0.5 text-center">{props.artistDescription}</div>
      <div className="flex gap-4">
        <div className="flex-col flex justify-center gap-2">
          <div className="font-medium text-xl">{props.numberOfFollowers}</div>
          <div>followers</div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-medium text-xl">{props.numberOfPosts}</div>
          <div>posts</div>
        </div>
      </div>
    </div>
  );
}
