import SingleArtPageWrapper from "../../../../wrappers/SingleArtPageWrapper";
import NotFound from "../../../not-found";

export default async function Page(props: { params: { id: string } }) {
  if (props.params.id.length !== 24) {
    return <NotFound />;
  }

  return <SingleArtPageWrapper id={props.params.id} success={false} cancel={true} />;
}
