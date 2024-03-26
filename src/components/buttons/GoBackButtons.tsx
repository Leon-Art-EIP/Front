"use client";

import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import IconButton from "../single-art-page/artwork/IconButton";

interface IGoBackButtonProps {
  href?: string;
}

export default function GoBackButton(props: IGoBackButtonProps): JSX.Element {
  const router = useRouter();

  const handleOnClick = () => {
    if (props.href) {
      router.push(props.href);
    } else {
      router.back();
    }
  };

  return (
    <IconButton onClick={handleOnClick} icon={KeyboardArrowLeft} backgroundColor="bg-background-hl" color="secondary" />
  );
}
