import SingleArtPageWrapper from "../../../../wrappers/SingleArtPageWrapper";
import NotFound from "../../../not-found";

// TODO: connect using Clerk https://clerk.com/docs/references/nextjs/custom-signup-signin-pages
// why ? because localStorage need "use client" so we currently can't use the data of connected user in server side

export default async function Page(props: { params: { id: string } }) {
  if (props.params.id.length !== 24) {
    return <NotFound />;
  }

  return <SingleArtPageWrapper id={props.params.id} success={true} cancel={false} />;
}
