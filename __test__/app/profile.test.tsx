import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Profile from "../../src/app/profile/page";

test("Profile page test", () => {
  const { container } = render(<Profile />);

  expect(container.textContent).toContain("Page de profil");
});
