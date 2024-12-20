"use client";

import { AccountCircle, Contrast, Description, Security, MarkEmailUnread } from "@mui/icons-material";
import Link from "next/link";
import DisconnectButton from "../../components/buttons/DisconnectButton";
import IconLabel from "../../components/label/IconLabel";
import ThemeSelector from "../../components/theme/ThemeSelector";
import "../globals.css";
import CustomSwitch from "../../components/buttons/CustomSwitch";
import React, { useState, useEffect } from "react";
import { myFetch } from "../../tools/myFetch";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { IConnectedUser } from "../../interfaces/user/user";
import { useRouter } from "next/navigation";

interface ISettingTab {
  icon: any;
  text: string;
  type: "link" | "selector" | "switch";
  href?: string;
}

export default function Page(): JSX.Element {
  const router = useRouter();

  const [switchState, setSwitchState] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchProfileAfterChange, setFetchProfileAfterChange] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const tabs: ISettingTab[] = [
    {
      icon: AccountCircle,
      text: "Informations personnelles",
      type: "link",
      href: "/settings/me",
    },
    {
      icon: Security,
      text: "Mot de passe et sécurité",
      type: "link",
      href: "/settings/password",
    },
    {
      icon: Description,
      text: "Conditions générales de ventes",
      type: "link",
      href: "/settings/terms",
    },
    {
      icon: Contrast,
      text: "Thème",
      type: "selector",
    },
    {
      icon: MarkEmailUnread,
      text: "Notifications par mail",
      type: "switch",
    },
  ];

  useEffect(() => {
    const handleUnauthorized = () => {
      router.push("/login");
    };

    setFetchProfileAfterChange(false);
    const fetchUserProfile = async () => {
      const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.user.id;
      const response = await myFetch({ route: `/api/user/profile/${userId}`, method: "GET", handleUnauthorized });
      if (response.ok) {
        const profileData: IProfileUser = response.json;
        if (profileData.emailNotificationEnabled !== undefined) {
          setSwitchState(profileData.emailNotificationEnabled);
        } else {
          console.error("emailNotificationEnabled property not found in profileData.");
        }
      } else {
        console.error("Failed to fetch user profile:", response.message);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [fetchProfileAfterChange, router]);

  const handleSwitchChange = async () => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);

    const res = await myFetch({
      route: `/api/notifications/email-notification`,
      method: "PUT",
      body: JSON.stringify({ emailNotificationEnabled: newSwitchState }), // Sending the updated state
    });
    if (!res.ok) {
      console.error("Failed to update email notifications");
    }

    setFetchProfileAfterChange(true);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[1500px] w-full gap-12 lg:py-8 py-4 lg:px-10 px-6">
        <h1 className="text-tertiary">Paramètres</h1>
        <div className="flex flex-col gap-4">
          {tabs.map((tab, index) => (
            <div key={index} className="p-4 hover:bg-secondary-hover rounded-lg">
              {tab.type === "link" ? (
                <Link href={tab.href!}>
                  <IconLabel icon={tab.icon} text={tab.text} color="tertiary" />
                </Link>
              ) : tab.type === "selector" ? (
                <div className="flex items-center">
                  <div className="mr-16">
                    <IconLabel icon={tab.icon} text={tab.text} color="tertiary" />
                  </div>
                  <ThemeSelector />
                </div>
              ) : tab.type === "switch" ? (
                <div
                  className="flex items-center relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="mr-16">
                    <IconLabel icon={tab.icon} text={tab.text} color="tertiary" />
                  </div>
                  <CustomSwitch
                    labelOn="Activé"
                    labelOff="Désactivé"
                    checked={switchState}
                    onChange={handleSwitchChange}
                    tooltip="Cliquez pour activer/désactiver les notifications par mail"
                  />
                  {isHovered && (
                    <div className="ml-4 top-1/2 transform -translate-y-1 bg-secondary-hl text-tertiary p-2 rounded-lg shadow-lg max-w-[50%]">
                      Lorsque vous activez les notifications par mail, vous serez alerté lorsqu&apos;un utilisateur like
                      un de vos posts ou commence à vous suivre. Vous recevrez également des mise à jour concernant vos
                      commandes.
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="self-center py-4">
          <DisconnectButton />
        </div>
      </div>
    </div>
  );
}
