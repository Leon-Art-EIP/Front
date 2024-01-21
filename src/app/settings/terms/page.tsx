import GoBackButton from "../../../components/buttons/GoBackButtons";
import { IResponseTerms } from "../../../interfaces/settings/terms";
import NotFound from "../../not-found";

export default async function Page(): Promise<JSX.Element> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conditions`, {
    method: "GET",
  });

  if (!response.ok) {
    return <NotFound />;
  }

  const terms = (await response.json()) as IResponseTerms;

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
      <div className="px-24 font-semibold whitespace-pre-line">{terms.conditions}</div>
    </div>
  );
}
