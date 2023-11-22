"use client";

import { usePathname, useRouter } from "next/navigation";
import { RecoilState, useSetRecoilState } from "recoil";
import { ITab } from "../../../src/interfaces";
import { isLoggedIn } from "../../recoil/SetupRecoil";
import Navbar from "../navbar/Navbar";
import Link from "../link/Link";

interface IHeaderProps {
  tabs: ITab[];
}

export default function Header(props: IHeaderProps): JSX.Element {
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  const displayHeader =
    pathname === "/" ||
    props.tabs.find((tab) => {
      if (tab.href === "/") return tab.href === pathname;
      return pathname.includes(tab.href);
    })?.loggedIn;

  if (!displayHeader) {
    return <></>;
  }

  return <Navbar tabs={props.tabs} selectedTabHref={pathname} link={Link} />;
}
