"use client";

import { useEffect, useState } from "react";
import { ITab } from "../../../src/interfaces";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import Link from "../link/Link";
import Navbar from "../navbar/Navbar";
import VerticalNavbar from "../navbar/VerticalNavbar";
import { IProfileUser } from "../../interfaces/user/profileUser";

interface IHeaderProps {
  tabs: ITab[];
  userId: string;
  pathname: string;
}

export default function Header(props: IHeaderProps): JSX.Element {
  const [width, setWindowWidth] = useState(0);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await myFetch({ route: `/api/user/profile/${props.userId}`, method: "GET" });
      if (response.ok) {
        const artist = response.json as IProfileUser;
        setProfilePicture(artist.profilePicture);
      }
    };

    fetchData();
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [props.userId]);

  if (width < 500) {
    return <VerticalNavbar tabs={props.tabs} selectedTabHref={props.pathname} link={Link} userId={props.userId} />;
  }

  return (
    <Navbar
      tabs={props.tabs}
      selectedTabHref={props.pathname}
      link={Link}
      userId={props.userId}
      image={`${imageApi}/${profilePicture}`}
    />
  );
}
