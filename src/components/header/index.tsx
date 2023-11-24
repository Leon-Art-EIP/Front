"use client";

import { ITab } from "../../../src/interfaces";
import Navbar from "../navbar/Navbar";
import Link from "../link/Link";
import { useEffect, useState } from "react";
import VerticalNavbar from "../navbar/VerticalNavbar";
import { IUser } from "../../interfaces/user/user";

interface IHeaderProps {
  tabs: ITab[];
  user: IUser;
  pathname: string;
}

export default function Header(props: IHeaderProps): JSX.Element {
  const [width, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (width < 500) {
    return <VerticalNavbar tabs={props.tabs} selectedTabHref={props.pathname} link={Link} user={props.user} />;
  }

  return <Navbar tabs={props.tabs} selectedTabHref={props.pathname} link={Link} user={props.user} />;
}
