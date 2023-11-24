"use client";

import { usePathname } from "next/navigation";
import { ITab } from "../../interfaces";
import Header from "../header";
import LoginWrapper from "../../wrappers/login/LoginWrapper";
import { IConnectedUser } from "../../interfaces/user/user";
import { useEffect, useState } from "react";
import LoadingPage from "../loading/LoadingPage";

export interface ISessionProps {
  tabs: ITab[];
  children: React.ReactNode;
}

export default function Session(props: ISessionProps): JSX.Element | null {
  const [user, setUser] = useState<IConnectedUser | undefined>();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const needLoggedIn = props.tabs.find((tab) => {
    if (tab.href === "/") return tab.href === pathname;
    return pathname.includes(tab.href);
  })?.loggedIn;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if ((user && user.token) || ((!user || !user.token) && !needLoggedIn)) {
    return (
      <>
        <Header tabs={props.tabs} />
        {props.children}
      </>
    );
  }
  return <LoginWrapper />;
}
