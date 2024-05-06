import GoBackButton from "../../../components/buttons/GoBackButtons";
import CreateSingleArtWrapper from "../../../wrappers/single/create/CreateSingleArtWrapper";

export default function Page(): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <div className="w-32 bg-secondary flex justify-center p-8">
        <div className="h-32">
          <GoBackButton />
        </div>
      </div>
      <div className="flex-1 h-full">
        <CreateSingleArtWrapper />
      </div>
      <div className="w-32 bg-secondary" />
    </div>
  );
}
