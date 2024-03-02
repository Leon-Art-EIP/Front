"use client";

import { ElementType, useState } from "react";
import Tabs from "../../components/profile/tabs/Tabs";
import Collections from "../../components/profile/collections/Collections";
import { IProfileArt, IProfileCollection } from "../../interfaces/profile/profileCollection";
import Publications from "../../components/profile/publications/Publications";
import AboutWrapper from "./AboutWrapper";

interface ITabsWrapperProps {
  aboutTitle: string;
  aboutDescription?: string;
  collections: IProfileCollection[];
  publications: IProfileArt[];
  myProfile: boolean;
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function TabsWrapper(props: ITabsWrapperProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<"publications" | "collections" | "about">("publications");

  const aboutTabOnClick = () => {
    setSelectedTab("about");
  };

  const publicationsTabOnClick = () => {
    setSelectedTab("publications");
  };

  const collectionsTabOnClick = () => {
    setSelectedTab("collections");
  };

  return (
    <>
      <div className="w-3/4">
        <Tabs
          aboutTabOnClick={aboutTabOnClick}
          collectionsTabOnClick={collectionsTabOnClick}
          publicationsTabOnClick={publicationsTabOnClick}
          selectedTab={selectedTab}
        />
      </div>
      {selectedTab === "publications" && <Publications link={props.link} profileArts={props.publications} />}
      {selectedTab === "collections" && <Collections link={props.link} collections={props.collections} />}
      {selectedTab === "about" && (
        <AboutWrapper title={props.aboutTitle} description={props.aboutDescription ?? ""} myProfile={props.myProfile} />
      )}
    </>
  );
}
