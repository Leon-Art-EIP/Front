import { useState } from "react";
import IconButton from "../single-art-page/artwork/IconButton";
import { INavbarProps } from "./Navbar";
import { Menu } from "@mui/icons-material";

export default function VerticalNavbar(props: INavbarProps): JSX.Element {
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
      {open && <div className="absolute z-10 bg-white mt-[95px]">salut a tous</div>}
    </div>
  );
}
