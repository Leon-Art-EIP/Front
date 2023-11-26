import Link from "next/link";
import IconLabel from "../../components/label/IconLabel";
import { AccountCircle, Description, Security } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import DisconnectButton from "../../components/buttons/DisconnectButton";

interface ISettingTab {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  href: string;
  text: string;
}

export default function Page(): JSX.Element {
  const tabs: ISettingTab[] = [
    {
      icon: AccountCircle,
      href: "/settings/me",
      text: "Informations personnelles",
    },
    {
      icon: Security,
      href: "/settings/password",
      text: "Mot de passe et sécurité",
    },
    {
      icon: Description,
      href: "/settings/terms",
      text: "Conditions générales de ventes",
    },
  ];

  return (
    <div className="py-5 px-16 flex flex-col">
      <div className="text-2xl font-bold px-5 py-4">Paramètres</div>
      <div className="flex flex-col divide-y divide-secondaryGrey">
        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href} className="p-4 hover:bg-secondaryGreyHover rounded-full">
            <IconLabel icon={tab.icon} text={tab.text} />
          </Link>
        ))}
      </div>
      <div className="self-center py-4">
        <DisconnectButton />
      </div>
    </div>
  );
}
