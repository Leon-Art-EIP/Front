"use client";

import { useState, useEffect } from "react";
import { Button, Modal } from "../../lib";
import { myFetch } from "../../../tools/myFetch";
import Fetcher from "../../fetch/Fetcher";

interface ReportButtonProps {
  closeModal(): void;
  id: string;
  isOpen: boolean;
  title: string;
}

const infractionTranslations: { [key: string]: string } = {
  "AI-generated Art": "Art généré par IA",
  "Intellectual Property Violation": "Violation des droits d'auteur",
  spam: "Spam",
  "Not Art": "Il ne s'agit pas d'art",
  "Hate Speech or Symbols": "Discours ou symboles de haine",
  Other: "Autre",
};

export default function ReportButton(props: ReportButtonProps): JSX.Element {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportInputValue, setReportInputValue] = useState<string>("");
  const [infractions, setInfractions] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>(infractions[0] || "");
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportInputValue(event.target.value);
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(event.target.value);
  };

  const handleOnModify = () => {
    setBody(
      JSON.stringify({
        artPublicationId: props.id,
        infraction: selectedReason,
        message: reportInputValue,
      })
    );
    setNbFetchs(nbFetchs + 1);
    setIsReportModalOpen(false);
  };

  useEffect(() => {
    async function fetchInfractions() {
      const res = await myFetch({ route: `/api/signalments/infractions`, method: "GET" });
      if (res.ok) {
        const infractions = res.json as string[];
        setInfractions(infractions);
        setSelectedReason(infractions[0]);
      }
    }
    fetchInfractions();
  }, []);

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetchs}
        route="/api/signalments/art-publication"
        successStr="Report submitted successfully"
        body={body}
        setIsLoading={setIsLoading}
      />
      <Modal isOpen={props.isOpen} handleClose={props.closeModal}>
        <div className="flex flex-col gap-2">
          <div className="text-xl text-center font-bold">{props.title}</div>
          <select
            className="focus:outline-none border border-blue-100 rounded-2xl h-10 text-center"
            value={selectedReason}
            onChange={handleReasonChange}
          >
            {infractions.map((infraction, index) => (
              <option key={index} value={infraction}>
                {infractionTranslations[infraction] || infraction}
              </option>
            ))}
          </select>
          <div className="text-l text-center">Détails (optionnel)</div>
          <input
            value={reportInputValue}
            onChange={handleOnChange}
            className="focus:outline-none border border-blue-100 rounded-2xl h-10 text-center"
          />
          <Button color="danger" type="button" className="self-center" onClick={handleOnModify} loading={isLoading}>
            Signaler
          </Button>
        </div>
      </Modal>
    </>
  );
}
