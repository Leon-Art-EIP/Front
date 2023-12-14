import SingleArtPageWrapper from "../../../wrappers/SingleArtPageWrapper";

// TODO: connect using Clerk https://clerk.com/docs/references/nextjs/custom-signup-signin-pages
// why ? because localStorage need "use client" so we currently can't use the data of connected user in server side

export default async function Page(props: { params: { id: string } }) {
  return <SingleArtPageWrapper params={props.params} />;
}
