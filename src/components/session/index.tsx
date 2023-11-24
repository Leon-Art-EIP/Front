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
  const correspondingTab = props.tabs.find((tab) => {
    if (tab.href === "/") return tab.href === pathname;
    return pathname.includes(tab.href);
  });

  useEffect(() => {
    setLoading(false);
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(undefined);
    }
  }, [pathname]);

  if (loading) {
    return <LoadingPage />;
  }

  if ((user && user.token) || ((!user || !user.token) && correspondingTab?.loggedIn === false)) {
    return (
      <>
        {correspondingTab?.header && user && <Header tabs={props.tabs} user={user.user} pathname={pathname} />}
        {props.children}
      </>
    );
  }
  return <LoginWrapper />;
}
