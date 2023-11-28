import SettingsPasswordForm from "../../../forms/tsx/SettingsPasswordForm";

export default function SettingsPasswordWrapper(): JSX.Element {
  return (
    <div className="px-24 flex flex-col gap-4 py-4">
      <div className="font-semibold text-2xl">Mot de passe</div>
      <SettingsPasswordForm />
    </div>
  );
}
