"use client";

import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { connectedUser, notLoggedInUserData } from "../../recoil/SetupRecoil";

export default function Page(): JSX.Element {
  const router = useRouter();
  const setConnectedUser = useSetRecoilState(connectedUser);

  const handleOnClick = () => {
    localStorage.removeItem("user");
    setConnectedUser(notLoggedInUserData);
    router.push("/login");
  };

  return (
    <div>
      <div>Page de profil</div>
      <button className="p-2 bg-red-600 text-white rounded-full" onClick={handleOnClick}>
        Se déconnecter
      </button>
    </div>
  );
}
