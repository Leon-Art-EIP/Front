import SingleArtPageWrapper from "../../../../wrappers/SingleArtPageWrapper";
import NotFound from "../../../not-found";

export default async function Page(props: { params: { id: string } }) {
  return <SingleArtPageWrapper id={props.params.id} success={true} cancel={false} />;
}
