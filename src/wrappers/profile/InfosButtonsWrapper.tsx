"use client";

import Button from "../../components/profile/Button";

export default function InfosButtonsWrapper(): JSX.Element {
  return (
    <div className="flex gap-2 [&>*]:flex-1">
      <Button onClick={() => {}} text="Contacter" />
      <Button onClick={() => {}} text="Suivre" className="text-white bg-primaryRed" />
    </div>
  );
}
