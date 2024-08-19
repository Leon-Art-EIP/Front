import SingleArtPageWrapper from "../../../wrappers/SingleArtPageWrapper";

export default async function Page(props: { params: { id: string } }) {
  return <SingleArtPageWrapper id={props.params.id} success={false} cancel={false} />;
}
