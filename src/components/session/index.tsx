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
  const [loaded, setLoaded] = useState<boolean>(false);
  const pathname = usePathname();
  const correspondingTab = props.tabs.find((tab) => {
    if (tab.href === "/") return tab.href === pathname;
    return pathname.includes(tab.href);
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(undefined);
    }
    setLoaded(true);
  }, [pathname]);

  if ((user && user.token) || ((!user || !user.token) && correspondingTab?.loggedIn === false)) {
    return (
      <>
        {correspondingTab?.header && user && <Header tabs={props.tabs} userId={user.user.id} pathname={pathname} />}
        {props.children}
      </>
    );
  } else if (loaded && (!user || !user.token)) {
    return <LoginWrapper />;
  }
  return <LoadingPage />;
}
