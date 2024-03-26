"use client";

import { useRouter } from "next/navigation";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-primary">404 Cette page n&apos;existe pas</h1>
      <button className="underline font-bold text-tertiar-400" onClick={() => router.back()}>
        Retour
      </button>
    </div>
  );
}
