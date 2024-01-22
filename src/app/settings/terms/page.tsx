import GoBackButton from "../../../components/buttons/GoBackButtons";
import TermsWrapper from "../../../wrappers/terms/TermsWrapper";

export default async function Page(): Promise<JSX.Element> {
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
      <TermsWrapper />
    </div>
  );
}
