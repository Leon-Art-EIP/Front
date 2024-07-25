import { AccountCircle, Contrast, Description, Security } from "@mui/icons-material";
import Link from "next/link";
import DisconnectButton from "../../components/buttons/DisconnectButton";
import IconLabel from "../../components/label/IconLabel";
import ThemeSelector from "../../components/theme/ThemeSelector";
import "../globals.css";

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
        <footer></footer>
      </div>
    </div>
  );
}
