import { Settings } from "@mui/icons-material";
import { ElementType } from "react";
import { ITab } from "../../interfaces";
import ProfilePicture from "../profile/profilePicture/ProfilePicture";
import Notifications from "./notifications/Notifications";
import TextLogo from "../text-logo/TextLogo";

export interface INavbarProps {
  tabs: ITab[];
  selectedTabHref: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
  userId: string;
  image: string;
}

export default function Navbar({ link: Link, ...props }: INavbarProps) {
  return (
    <div className="flex h-24 p-2 bg-background w-full gap-4 border-b border-b-secondary">
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
                <div className={`${props.selectedTabHref === tab.href ? "text-primary" : "text-tertiary"}`}>
                  {tab.name}
                </div>
              </Link>
            )
        )}
      </div>
      <div className="items-center justify-end flex px-2">
        <div className="flex gap-2 align-middle items-center text-tertiary">
          <Notifications />
          <Link href={`/settings`}>
            <Settings />
          </Link>
          <Link href={`/profile/${props.userId}`}>
            <div className="h-16 w-16">
              <ProfilePicture src={props.image} width={64} height={64} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
