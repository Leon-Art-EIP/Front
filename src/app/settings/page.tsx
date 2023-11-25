import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <div className="p-5 bg-red-300">
      <div className="flex flex-col gap-2 divide-y divide-secondaryGrey">
        <Link href="/settings/me">
          <div>Informations personnelles</div>
        </Link>
        <Link href="/settings/password">
          <div>Mot de passe et sécurité</div>
        </Link>
        <Link href="/settings/terms">
          <div>Conditions générales de vente</div>
        </Link>
      </div>
    </div>
  );
}
