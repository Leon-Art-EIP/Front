"use client";

import { RecoilRoot, useRecoilValue } from "recoil";
import Session, { ISessionProps } from "../session";
import { connectedUser } from "../../recoil/SetupRecoil";

export default function Providers(props: ISessionProps): JSX.Element {
  return (
    <RecoilRoot>
      <Session tabs={props.tabs}>
        {props.children}
      </Session>
    </RecoilRoot>
  );
}
