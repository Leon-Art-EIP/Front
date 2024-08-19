import { render } from "@testing-library/react";
import React, { ElementType } from "react";
import { expect, test } from "vitest";
import LinkButton from "../../../src/components/lib/Button/LinkButton.tsx";

test("link button 1", () => {
  const linkButton: ElementType<{ children: JSX.Element; href: string }> = ({ children }) => <a>{children}</a>;

  const { container } = render(
    <LinkButton href="/" link={linkButton} type="button" color="primary">
      test 1
    </LinkButton>
  );
  expect(container.textContent).toContain("test 1");
});

test("link button 2", () => {
  const linkButton: ElementType<{ children: JSX.Element; href: string }> = ({ children }) => <a>{children}</a>;

  const { container } = render(
    <LinkButton href="/" link={linkButton} type="button" color="primary">
      test 2
    </LinkButton>
  );
  expect(container.textContent).toContain("test 2");
});

test("link button 3", () => {
  const linkButton: ElementType<{ children: JSX.Element; href: string }> = ({ children }) => <a>{children}</a>;

  const { container } = render(
    <LinkButton href="/" link={linkButton} type="button" color="primary">
      test 3
    </LinkButton>
  );
  expect(container.textContent).toContain("test 3");
});

test("link button 4", () => {
  const linkButton: ElementType<{ children: JSX.Element; href: string }> = ({ children }) => <a>{children}</a>;

  const { container } = render(
    <LinkButton href="/" link={linkButton} type="button" color="primary">
      test 4
    </LinkButton>
  );
  expect(container.textContent).toContain("test 4");
});
