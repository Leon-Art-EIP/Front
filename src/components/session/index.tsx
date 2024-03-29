"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ITab } from "../../interfaces";
import { IConnectedUser } from "../../interfaces/user/user";
import Header from "../header";
import LoadingPage from "../loading/LoadingPage";

export interface ISessionProps {
  tabs: ITab[];
  children: React.ReactNode;
}

export default function Session(props: ISessionProps): JSX.Element | null {
  const [user, setUser] = useState<IConnectedUser | null | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();
  const correspondingTab = props.tabs.find((tab) => {
    if (tab.href === "/") return tab.href === pathname;
    return pathname.includes(tab.href);
  });

  useEffect(() => {
    // no choice to use useEffect for localStorage
    const local = localStorage.getItem("user");
    if (local) {
      setUser(JSON.parse(local));
    } else {
      setUser(null);
    }
  }, [pathname]);

  useEffect(() => {
    // Redirect only after the initial render
    if (correspondingTab?.loggedIn !== false && (user === null || (user && !user.token))) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  if ((user && user.token) || ((!user || !user.token) && correspondingTab?.loggedIn === false)) {
    return (
      <>
        {correspondingTab?.header && user && <Header tabs={props.tabs} userId={user.user.id} pathname={pathname} />}
        {props.children}
      </>
    );
  }

  return <LoadingPage />;
}
