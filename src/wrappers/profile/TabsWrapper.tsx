"use client";

import { ElementType, useState, useEffect, SetStateAction, Dispatch } from "react";
import Collections from "../../components/profile/collections/Collections";
import Publications from "../../components/profile/publications/Publications";
import Tabs from "../../components/profile/tabs/Tabs";
import { IProfileArt, IProfileCollection } from "../../interfaces/profile/profileCollection";
import { ICollectionArtsExtended } from "../../interfaces/single/collection";
import AboutWrapper from "./AboutWrapper";
import { Report } from "@mui/icons-material";
import { Button, Modal } from "../../components/lib";
import { myFetch } from "../../tools/myFetch";

interface ITabsWrapperProps {
  aboutTitle: string;
  aboutDescription?: string;
  collections: IProfileCollection[];
  collectionsArtsExtended: ICollectionArtsExtended[];
  publications: IProfileArt[];
  myProfile: boolean;
  link: ElementType<{ children: JSX.Element; href: string }>;
  setProfileCollections: Dispatch<SetStateAction<IProfileCollection[]>>;
  setCollectionsArtsExtended: Dispatch<SetStateAction<ICollectionArtsExtended[]>>;
}

const infractionTranslations: { [key: string]: string } = {
  "AI-generated Art": "Art généré par IA",
  "Intellectual Property Violation": "Violation des droits d'auteur",
  spam: "Spam",
  "Not Art": "Il ne s'agit pas d'art",
  "Hate Speech or Symbols": "Discours ou symboles de haine",
  Other: "Autre",
};

export default function TabsWrapper(props: ITabsWrapperProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<"publications" | "collections" | "about">("publications");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportInputValue, setReportInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [infractions, setInfractions] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>(infractions[0] || "");

  const aboutTabOnClick = () => {
    setSelectedTab("about");
  };

  const publicationsTabOnClick = () => {
    setSelectedTab("publications");
  };

  const collectionsTabOnClick = () => {
    setSelectedTab("collections");
  };

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleReportSubmit = (reason: string, description: string) => {
    console.log("Report submitted:", { reason, description });
    setIsReportModalOpen(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportInputValue(event.target.value);
  };

  const handleOnModify = async () => {
    setIsReportModalOpen(false);
    handleReportSubmit(selectedReason, reportInputValue);
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(event.target.value);
  };

  useEffect(() => {
    async function fetchArticle() {
      const res = await myFetch({ route: `/api/signalments/infractions`, method: "GET" });
      if (res.ok) {
        const infractions = res.json as string[];
        setInfractions(infractions);
        console.log(infractions);
      }
    }
    fetchArticle();
  }, []);

  return (
    <>
      <div className="w-3/4 flex items-center justify-between">
        <div className="flex-1">
          <Tabs
            aboutTabOnClick={aboutTabOnClick}
            collectionsTabOnClick={collectionsTabOnClick}
            publicationsTabOnClick={publicationsTabOnClick}
            selectedTab={selectedTab}
          />
        </div>
        {!props.myProfile && <Report className="cursor-pointer ml-4" onClick={handleReportClick} />}
      </div>
      {selectedTab === "publications" && <Publications link={props.link} profileArts={props.publications} />}
      {selectedTab === "collections" && (
        <Collections
          link={props.link}
          collections={props.collections}
          collectionsArtsExtended={props.collectionsArtsExtended}
          setProfileCollections={props.setProfileCollections}
          setCollectionsArtsExtended={props.setCollectionsArtsExtended}
        />
      )}
      {selectedTab === "about" && (
        <AboutWrapper title={props.aboutTitle} description={props.aboutDescription ?? ""} myProfile={props.myProfile} />
      )}
      <Modal handleClose={handleCloseReportModal} isOpen={isReportModalOpen}>
        <div className="flex flex-col gap-2">
          <div className="text-xl text-center font-bold">Signaler ce compte</div>
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
          <Button color="danger" type="button" className="self-center" onClick={handleOnModify}>
            Signaler
          </Button>
          {/* {error && <div className="text-primary text-center">{error}</div>} */}
        </div>
      </Modal>
    </>
  );
}
