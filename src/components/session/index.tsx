import { usePathname } from "next/navigation";
import { ITab } from "../../interfaces";
import Header from "../header";
import LoginWrapper from "../../wrappers/login/LoginWrapper";
import { IConnectedUser } from "../../interfaces/user/user";
import { useRecoilValue } from "recoil";
import { connectedUser } from "../../recoil/SetupRecoil";

export interface ISessionProps {
  tabs: ITab[];
  children: React.ReactNode;
}

export default function Session(props: ISessionProps): JSX.Element | null {
  const userData = useRecoilValue<IConnectedUser>(connectedUser);
  const pathname = usePathname();
  const needLoggedIn = props.tabs.find((tab) => {
    if (tab.href === "/") return tab.href === pathname;
    return pathname.includes(tab.href);
  })?.loggedIn;

  if (userData.token || (!userData.token && !needLoggedIn)) {
    return (
      <>
        <Header tabs={props.tabs} />
        {props.children}
      </>
    );
  }
  return <LoginWrapper />;
}
