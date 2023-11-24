import { ElementType, useState } from "react";
import { ITab } from "../../interfaces";
import TextLogo from "../text-logo/TextLogo";
import profilePicture from "../../assets/profilePicture.png";
import ProfilePicture from "../profile/profilePicture/ProfilePicture";
import { IUser } from "../../interfaces/user/user";
import { Settings } from "@mui/icons-material";

export interface INavbarProps {
  tabs: ITab[];
  selectedTabHref: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
  user: IUser;
}

export default function Navbar({ link: Link, ...props }: INavbarProps) {
  return (
    <div className="flex h-24 p-2 bg-white w-full gap-4 border-b border-b-secondaryGrey">
      <div className="items-center justify-start md:flex hidden px-2 h-full font-bold text-4xl">
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <div className="flex flex-1 justify-around items-center align-middle gap-2 px-2">
        {props.tabs.map(
          (tab) =>
            tab.navbar && (
              <Link key={`${tab.name}-${tab.href}`} href={tab.href}>
                <div style={{ color: `${props.selectedTabHref === tab.href ? "red" : "black"}` }}>{tab.name}</div>
              </Link>
            )
        )}
      </div>
      <div className="items-center justify-end flex px-2">
        <div className="flex gap-2 align-middle items-center">
          <Link href={`/settings`}>
            <Settings />
          </Link>
          <Link href={`/profile/${props.user.id}`}>
            <div className="h-16 w-16">
              <ProfilePicture src={profilePicture} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
