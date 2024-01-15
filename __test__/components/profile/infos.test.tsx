import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Infos from "../../../src/components/profile/infos/Infos";

test("Infos component test", () => {
  const { container } = render(
    <Infos
      artType="Peinture"
      availability="available"
      following={false}
      id="1234idtest"
      link={"a"}
      myProfile={false}
      key={"1234idtest"}
      artistName="jean"
      categories={["Broderie", "Acrylique"]}
      numberOfFollowers={1234}
      numberOfPosts={3}
    />
  );

  expect(container.textContent).toContain("jean");
});
