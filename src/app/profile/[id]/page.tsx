import ProfileWrapper from "../../../wrappers/profile/ProfileWrapper";

// TODO: get data from here when data from user connected is get from back part of the webapp

export default async function Page(props: { params: { id: string } }): Promise<JSX.Element> {
  return <ProfileWrapper id={props.params.id} />;
}
