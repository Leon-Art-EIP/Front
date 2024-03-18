import AddCommentForm from "../../../forms/tsx/AddCommentForm";

export default function SingleArtPageComments(): JSX.Element {
  return (
    <div className="flex flex-col gap-2 bg-blue-50 border border-neutral-300 rounded px-4 py-2">
      <h1 className="font-semibold text-xl">Commentaires</h1>
      <div className="flex flex-wrap gap-2 items-center">
        <div>profile picture</div>
        <AddCommentForm />
      </div>
    </div>
  );
}
