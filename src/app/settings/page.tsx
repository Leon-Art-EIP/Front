"use client";

import { AccountCircle, Contrast, Description, Security } from "@mui/icons-material";
import Link from "next/link";
import DisconnectButton from "../../components/buttons/DisconnectButton";
import IconLabel from "../../components/label/IconLabel";
import ThemeSelector from "../../components/theme/ThemeSelector";

interface ISettingTab {
  icon: any;
  text: string;
  type: "link" | "selector"; // Nouvelle propriété pour spécifier le type de l'onglet
  href?: string; // Lien vers lequel naviguer si le type est "link"
}

export default function Page(): JSX.Element {
  const tabs: ISettingTab[] = [
    {
      icon: AccountCircle,
      text: "Informations personnelles",
      type: "link", // L'onglet est un lien
      href: "/settings/me", // Lien vers la page d'informations personnelles
    },
    {
      icon: Security,
      text: "Mot de passe et sécurité",
      type: "link", // L'onglet est un lien
      href: "/settings/password", // Lien vers la page de mot de passe et sécurité
    },
    {
      icon: Description,
      text: "Conditions générales de ventes",
      type: "link", // L'onglet est un lien
      href: "/settings/terms", // Lien vers la page des conditions générales de ventes
    },
    {
      icon: Contrast,
      text: "Thème",
      type: "selector", // L'onglet est un sélecteur de thème
    },
  ];

  return (
    <div className="bg-background py-5 px-16 flex flex-col">
      <div className="text-tertiary text-2xl font-bold px-5 py-4">Paramètres</div>
      <div className="flex flex-col divide-y divide-secondary">
        {tabs.map((tab, index) => (
          <div key={index} className="p-4 hover:bg-secondary-hover rounded-full">
            {tab.type === "link" ? (
              <Link href={tab.href}>
                <IconLabel icon={tab.icon} text={tab.text} color="tertiary" />
              </Link>
            ) : (
              <div className="flex items-center">
                <div className="mr-16">
                  <IconLabel icon={tab.icon} text={tab.text} color="tertiary" />
                </div>
                <ThemeSelector />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="self-center py-4">
        <DisconnectButton />
      </div>
    </div>
  );
}
