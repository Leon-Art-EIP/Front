"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RecoilState, useSetRecoilState } from "recoil";
import { ITab } from "../../../src/interfaces";
import { isLoggedIn } from "../../recoil/SetupRecoil";

interface IHeaderProps {
  tabs: ITab[];
}

export default function Header(props: IHeaderProps): JSX.Element {
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  const displayHeader = pathname === "/" || props.tabs.find((tab) => tab.href === pathname)?.loggedIn;

  if (!displayHeader) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 p-2 border border-neutral-400 bg-blue-200">
      {props.tabs.map((tab) => (
        <Link key={`${tab.name}-${tab.href}`} href={tab.href} className="underline text-blue-400">
          {`->`} {tab.name}
        </Link>
      ))}
      <button
        title="Se déconnecter"
        name="signout"
        onClick={() => {
          router.push("/login");
          localStorage.removeItem("token");
          setLoggedIn(false);
        }}
        className="rounded-lg bg-red-500 text-white p-2 max-w-max"
      >
        Se déconnecter
      </button>
    </div>
  );
}
function useRecoilSetState(isLoggedIn: RecoilState<boolean>) {
  throw new Error("Function not implemented.");
}
