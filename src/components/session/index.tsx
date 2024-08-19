"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useFcmToken from "../../hooks/useFcmToken";
import { ITab } from "../../interfaces";
import { IConnectedUser } from "../../interfaces/user/user";
import { myFetch } from "../../tools/myFetch";
import Header from "../header";
import LoadingPage from "../loading/LoadingPage";

export interface ISessionProps {
  tabs: ITab[];
  children: React.ReactNode;
}

export default function Session(props: ISessionProps): JSX.Element | null {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
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
      const loggedInUser = JSON.parse(local);
      setUser(loggedInUser);

      if (loggedInUser && loggedInUser.token && fcmToken) {
        updateFcmTokenForUser(fcmToken);
      }
    } else {
      setUser(null);
    }
  }, [pathname, fcmToken]);

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

  async function updateFcmTokenForUser(fcmToken: string) {
    const res = await myFetch({
      route: `/api/notifications/update-fcm-token`,
      method: "PUT",
      body: JSON.stringify({ fcmToken }),
    });
    if (!res.ok) {
      console.error("FCM token not updated");
    }
  }

  return <LoadingPage />;
}
