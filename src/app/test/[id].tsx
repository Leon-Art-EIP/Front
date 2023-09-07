import { useRouter } from "next/router";

export default function TestTokenPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query; // Utilisez "id" au lieu de "token"

  return (
    <div>
      <h1 className="text-primaryRed">Test page with ID: {id}</h1>
    </div>
  );
}
