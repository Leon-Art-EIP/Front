import { useState } from "react";
import IconButton from "../single-art-page/artwork/IconButton";
import { INavbarProps } from "./Navbar";
import { Menu } from "@mui/icons-material";

export default function VerticalNavbar({ link: Link, ...props }: Omit<INavbarProps, "image">): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-start items-center h-24 bg-white w-full border-b border-b-secondaryGrey">
        <IconButton
          backgroundColor="white"
          color="black"
          icon={Menu}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      {open && (
        <div className="absolute z-10 flex bg-white mt-[95px] rounded-b-xl">
          <div className="flex flex-col justify-center items-center gap-5 py-2">
            {props.tabs.map(
              (tab) =>
                tab.verticalNavbar && (
                  <Link
                    key={`${tab.name}-${tab.href}`}
                    href={`${tab.href == "/profile" ? `/profile/${props.userId}` : tab.href}`}
                  >
                    <div style={{ color: `${props.selectedTabHref === tab.href ? "red" : "black"}` }} className="px-2">
                      {tab.name}
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
