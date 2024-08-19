"use client";

import { useState } from "react";
import Fetcher from "../../components/fetch/Fetcher";
import About from "../../components/profile/about/About";

interface IAboutWrapperProps {
  title: string;
  description: string;
  myProfile: boolean;
}

export default function AboutWrapper(props: IAboutWrapperProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [nbFetchs, setNbFetchs] = useState(0);
  const [ok, setOk] = useState(0);

  const handleOnModify = async (inputValue: string) => {
    setInputValue(inputValue);
    setNbFetchs(nbFetchs + 1);
  };

  const handleOk = () => {
    setOk(ok + 1);
  };

  return (
    <>
      <Fetcher
        nbFetchs={nbFetchs}
        handleOk={handleOk}
        method="POST"
        route="/api/user/profile/bio"
        successStr="La description a été modifiée avec succès"
        body={JSON.stringify({ biography: inputValue })}
      ></Fetcher>
      <About
        title={props.title}
        description={props.description}
        myProfile={props.myProfile}
        handleOnModify={handleOnModify}
        ok={ok}
      />
    </>
  );
}
