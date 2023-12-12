import GoBackButton from "../../../components/buttons/GoBackButtons";
import SettingsPasswordWrapper from "../../../wrappers/settings/password/SettingsPasswordWrapper";

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
          <div>Conditions générales de vente</div>
        </div>
      </div>
      <div className="px-24 font-semibold text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quo rerum explicabo dignissimos? Odio, doloribus
        distinctio. Illum ullam, voluptate, vitae corrupti eligendi explicabo ab aperiam maxime unde deserunt
        consequuntur nulla!
      </div>
    </div>
  );
}
