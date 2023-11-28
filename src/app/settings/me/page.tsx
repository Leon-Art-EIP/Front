import GoBackButton from "../../../components/buttons/GoBackButtons";
import SettingsMeWrapper from "../../../wrappers/settings/me/SettingsMeWrapper";

export default function Page() {
  return (
    <div className="flex flex-col py-5 gap-4">
      <div className="flex items-center align-middle">
        <div>
          <GoBackButton href="/settings" />
        </div>
        <div className="text-2xl font-bold px-3 py-4 flex gap-4">
          <div>Paramètres</div>
          <div>{">"}</div>
          <div>Informations personnelles</div>
        </div>
      </div>
      <SettingsMeWrapper />
    </div>
  );
}
