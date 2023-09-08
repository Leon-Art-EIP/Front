"use client";

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
  const needLoggedIn = pathname === "/" || props.tabs.find((tab) => tab.href === pathname)?.loggedIn;

  // if (isConnected || (!isConnected && !needLoggedIn)) {
    return (
      <>
        <Header tabs={props.tabs} />
        {props.children}
      </>
    );
  // }
  return <NotFound />;
}
