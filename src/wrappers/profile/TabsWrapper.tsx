"use client";

import { ElementType, useState } from "react";
import Tabs from "../../components/profile/tabs/Tabs";
import About from "../../components/profile/about/About";
import Collections from "../../components/profile/collections/Collections";
import { IProfileCollection } from "../../interfaces/profile/profileCollection";
import Publications from "../../components/profile/publications/Publications";

interface ITabsWrapperProps {
  aboutTitle: string;
  aboutDescription?: string;
  collections: IProfileCollection[];
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
      {selectedTab === "publications" && (
        <Publications link={props.link} profileArts={props.collections.flatMap((collection) => collection.pictures)} />
      )}
      {selectedTab === "collections" && <Collections link={props.link} collections={props.collections} />}
      {selectedTab === "about" && <About title={props.aboutTitle} description={props.aboutDescription} />}
    </>
  );
}
