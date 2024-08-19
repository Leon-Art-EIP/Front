"use client";

import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const router = useRouter();

  const handleOnClick = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div>
      <div>Page de profil</div>
      <button className="p-2 bg-primary text-white rounded-full" onClick={handleOnClick}>
        Se déconnecter
      </button>
    </div>
  );
}
