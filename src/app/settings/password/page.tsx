import GoBackButton from "../../../components/buttons/GoBackButton";
import SettingsPasswordWrapper from "../../../wrappers/settings/password/SettingsPasswordWrapper";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[1500px] w-full gap-12 lg:py-8 py-4 lg:px-10 px-6">
        <div className="flex items-center gap-8">
          <GoBackButton href="/settings" />
          <h1 className="text-tertiary">Mot de passe et sécurité</h1>
        </div>
        <SettingsPasswordWrapper />
      </div>
    </div>
  );
}
