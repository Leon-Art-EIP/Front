import CreateSingleArtWrapper from "../../../wrappers/single/create/CreateSingleArtWrapper";

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center bg-background">
      <div className="flex flex-col max-w-[1500px] w-full items-center gap-4 lg:py-8 py-4 lg:px-10 px-6">
        <CreateSingleArtWrapper />
      </div>
    </div>
  );
}
