import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Tabs from "../../../src/components/profile/tabs/Tabs";

test("Tabs component about test", () => {
  const { container } = render(
    <Tabs
      aboutTabOnClick={() => {}}
      collectionsTabOnClick={() => {}}
      publicationsTabOnClick={() => {}}
      selectedTab="about"
    />
  );

  expect(container).toBeDefined();
});

test("Tabs component collections test", () => {
  const { container } = render(
    <Tabs
      aboutTabOnClick={() => {}}
      collectionsTabOnClick={() => {}}
      publicationsTabOnClick={() => {}}
      selectedTab="collections"
    />
  );

  expect(container).toBeDefined();
});

test("Tabs component publications test", () => {
  const { container } = render(
    <Tabs
      aboutTabOnClick={() => {}}
      collectionsTabOnClick={() => {}}
      publicationsTabOnClick={() => {}}
      selectedTab="publications"
    />
  );

  expect(container).toBeDefined();
});
