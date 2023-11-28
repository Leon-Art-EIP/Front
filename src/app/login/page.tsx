import LoginWrapper from "../../wrappers/login/LoginWrapper";
import NotificationToastWrapper from "../../wrappers/notification/NotificationToastWrapper";

export default function Page(): JSX.Element {
  return (
    <>
      <NotificationToastWrapper />
      <LoginWrapper />
    </>
  );
}
