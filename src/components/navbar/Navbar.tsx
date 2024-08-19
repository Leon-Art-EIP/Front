import { Settings } from "@mui/icons-material";
import { ElementType } from "react";
import { ITab } from "../../interfaces";
import ProfilePicture from "../profile/profilePicture/ProfilePicture";
import TextLogo from "../text-logo/TextLogo";
import Notifications from "./notifications/Notifications";

export interface INavbarProps {
  tabs: ITab[];
  selectedTabHref: string;
  link: ElementType<{ children: JSX.Element; href: string }>;
  userId: string;
  image: string;
}

export default function Navbar({ link: Link, ...props }: INavbarProps) {
  return (
    <div className="flex h-24 flex-shrink-0 p-2 bg-background w-full gap-4 border-b border-b-secondary">
      <div className="items-center justify-start md:flex hidden px-2 h-full font-bold text-4xl">
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <div className="flex flex-1 flex-start gap-14 items-center align-middle px-8">
        {props.tabs.map(
          (tab) =>
            tab.navbar && (
              <Link key={`${tab.name}-${tab.href}`} href={tab.href} className="group transition duration-300">
                <span
                  className={`${
                    props.selectedTabHref === tab.href
                      ? "text-primary font-semibold"
                      : "text-tertiary font-normal hover:text-tertiary-hover hover:transition-all hover:duration-300"
                  } `}
                >
                  {tab.name}
                  {props.selectedTabHref === tab.href ? (
                    <span className="block w-full h-0.5 bg-primary"></span>
                  ) : (
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
                  )}
                </span>
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
              <ProfilePicture
                src={props.image}
                width={64}
                height={64}
                imageClassName="h-16 w-16 object-contain bg-black"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
