"use client";

import { useState } from "react";
import Tabs from "../../components/profile/tabs/Tabs";

export default function TabsWrapper(): JSX.Element {
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
    <Tabs
      aboutTabOnClick={aboutTabOnClick}
      collectionsTabOnClick={collectionsTabOnClick}
      publicationsTabOnClick={publicationsTabOnClick}
      selectedTab={selectedTab}
    />
  );
}
