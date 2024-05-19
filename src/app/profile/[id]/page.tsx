import ProfileWrapper from "../../../wrappers/profile/ProfileWrapper";

export default async function Page(props: { params: { id: string } }): Promise<JSX.Element> {
  return <ProfileWrapper id={props.params.id} />;
}
