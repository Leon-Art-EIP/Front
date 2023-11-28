"use client";

import { useSearchParams } from "next/navigation";
import { NotificationToast } from "../../components/lib";

export default function NotificationToastWrapper(): JSX.Element | null {
  const searchParams = useSearchParams();
  const newPassword = searchParams.get("newpassword");

  if (!newPassword) {
    return null;
  }

  return <NotificationToast message="Mot de passe modifié avec succès. Veuillez vous reconnecter." type="success" />;
}
