"use client";

import { useEffect, useState } from "react";
import { IResponseTerms } from "../../interfaces/settings/terms";

export default function TermsWrapper(): JSX.Element {
  const [terms, setTerms] = useState<IResponseTerms>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conditions`, {
        method: "GET",
      });

      if (response.ok) {
        const terms = (await response.json()) as IResponseTerms;
        setTerms(terms);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-semibold whitespace-pre-line">
      {!terms ? "Conditions Générales de Vente - Leon'Art" : terms.conditions}
    </div>
  );
}
