"use client";

import { AccountCircle, Contrast, Description, Security, MarkEmailUnread } from "@mui/icons-material";
import Link from "next/link";
import DisconnectButton from "../../components/buttons/DisconnectButton";
import IconLabel from "../../components/label/IconLabel";
import ThemeSelector from "../../components/theme/ThemeSelector";
import "../globals.css";
import CustomSwitch from "../../components/buttons/CustomSwitch";
import React, { useState } from "react";
import { myFetch } from "../../tools/myFetch";

interface ISettingTab {
  icon: any;
  text: string;
  type: "link" | "selector" | "switch";
  href?: string;
}

export default function Page(): JSX.Element {
  const [switchState, setSwitchState] = useState<boolean>(true);
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

  const handleSwitchChange = async () => {
    // Toggle switch state
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);

    const res = await myFetch({ route: `/api/notifications/email-notification`, method: "PUT" });
    if (!res.ok) {
      console.log("Failed to switch email notifications");
    }
  };

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
                <div className="flex items-center">
                  <div className="mr-16">
                    <IconLabel icon={tab.icon} text={tab.text} color="tertiary" />
                  </div>
                  <CustomSwitch
                    labelOn="Activé"
                    labelOff="Désactivé"
                    checked={switchState}
                    onChange={handleSwitchChange}
                    tooltip="Toggle to enable or disable notifications"
                  />
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
