"use client";

import { usePathname, useRouter } from "next/navigation";
import { ITab } from "../../../src/interfaces";
import Navbar from "../navbar/Navbar";
import Link from "../link/Link";
import { useEffect, useState } from "react";
import VerticalNavbar from "../navbar/VerticalNavbar";
import { useRecoilValue } from "recoil";
import { connectedUser } from "../../recoil/SetupRecoil";

interface IHeaderProps {
  tabs: ITab[];
}

export default function Header(props: IHeaderProps): JSX.Element {
  const [width, setWindowWidth] = useState(0);
  const pathname = usePathname();
  const user = useRecoilValue(connectedUser).user;

  const displayHeader =
    pathname === "/" ||
    props.tabs.find((tab) => {
      if (tab.href === "/") return tab.href === pathname;
      return pathname.includes(tab.href);
    })?.loggedIn;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (!displayHeader) {
    return <></>;
  }

  if (width < 500) {
    return <VerticalNavbar tabs={props.tabs} selectedTabHref={pathname} link={Link} user={user} />;
  }

  return <Navbar tabs={props.tabs} selectedTabHref={pathname} link={Link} user={user} />;
}
