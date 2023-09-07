import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import NotFound from "../../app/not-found";
import { ITab } from "../../interfaces";
import { isLoggedIn } from "../../recoil/SetupRecoil";
import Header from "../header";

export interface ISessionProps {
  tabs: ITab[];
  children: React.ReactNode;
}

export default function Session(props: ISessionProps): JSX.Element | null {
  const isConnected = useRecoilValue(isLoggedIn);
  const pathname = usePathname();
  const needLoggedIn = props.tabs.find((tab) => tab.href === pathname)?.loggedIn;
  const isTestRoute = /^\/test\//.test(pathname);

  if (isTestRoute) {
    return (
      <>
        <Header tabs={props.tabs} />
        {props.children}
      </>
    );
  }

  if (isConnected || (!isConnected && !needLoggedIn)) {
    return (
      <>
        <Header tabs={props.tabs} />
        {props.children}
      </>
    );
  }
  return <NotFound />;
}
