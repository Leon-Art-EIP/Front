"use client";

import { useState } from "react";
import Tabs from "../../components/profile/tabs/Tabs";
import PicturesWrapper from "./PicturesWrapper";
import About from "../../components/profile/about/About";
import Collections from "../../components/profile/collections/Collections";

interface ITabsWrapperProps {
  aboutTitle: string;
  aboutDescription: string;
  collections: {
    id: number;
    title: string;
    picturesIds: number[];
  }[];
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
      {selectedTab === "publications" && <PicturesWrapper />}
      {selectedTab === "collections" && <Collections collections={props.collections} />}
      {selectedTab === "about" && <About title={props.aboutTitle} description={props.aboutDescription} />}
    </>
  );
}
