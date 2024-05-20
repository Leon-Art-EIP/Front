import ProfileWrapper from "../../../wrappers/profile/ProfileWrapper";
import "../../globals.css";

export default async function Page(props: { params: { id: string } }): Promise<JSX.Element> {
  return (
    <div>
      <ProfileWrapper id={props.params.id} />;
    </div>
  );
}
