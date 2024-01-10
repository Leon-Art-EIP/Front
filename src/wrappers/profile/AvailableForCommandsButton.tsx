"use client";

import IconButton from "../../components/profile/IconButton";
import Chevron from "../../components/profile/infos/Chevron";

export default function AvailableForCommandsButton(): JSX.Element {
  return (
    <IconButton onClick={() => {}} text="Ouvert aux commandes" className="text-green-500 bg-[#DDD]" icon={Chevron} />
  );
}
