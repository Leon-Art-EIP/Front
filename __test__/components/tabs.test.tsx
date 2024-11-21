import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Tabs from "../../src/components/profile/tabs/Tabs";

test("Tabs about snapshot", () => {
  testSnapshot(
    <Tabs
      aboutTabOnClick={() => {}}
      collectionsTabOnClick={() => {}}
      publicationsTabOnClick={() => {}}
      selectedTab="about"
    />
  );
});

test("Tabs collections snapshot", () => {
  testSnapshot(
    <Tabs
      aboutTabOnClick={() => {}}
      collectionsTabOnClick={() => {}}
      publicationsTabOnClick={() => {}}
      selectedTab="collections"
    />
  );
});

test("Tabs publications snapshot", () => {
  testSnapshot(
    <Tabs
      aboutTabOnClick={() => {}}
      collectionsTabOnClick={() => {}}
      publicationsTabOnClick={() => {}}
      selectedTab="publications"
    />
  );
});
