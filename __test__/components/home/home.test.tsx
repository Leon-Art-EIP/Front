import { render } from "@testing-library/react";
import React, { ElementType } from "react";
import { expect, test } from "vitest";
import PassingArt from "../../../src/components/home/passingArt/PassingArt";
import LinkButton from "../../../src/components/lib/Button/LinkButton.tsx";

test("renders PassingArt 1", () => {
  const { container } = render(
    <PassingArt
      increasePosition={() => {}}
      nbrPoints={3}
      position={1}
      passingArt={{
        title: "passing art 1",
        mainImage: "main image 1",
        content: "content 1",
        author: {
          username: "Artiste 1",
        },
        createdAt: "2021-09-01",
        position: 1,
      }}
    />
  );
  expect(container.textContent).toContain("passing art 1");
});

test("renders PassingArt 2", () => {
  const { container } = render(
    <PassingArt
      increasePosition={() => {}}
      nbrPoints={3}
      position={1}
      passingArt={{
        title: "passing art 2",
        mainImage: "main image 2",
        content: "content 2",
        author: {
          username: "Artiste 2",
        },
        createdAt: "2021-09-01",
        position: 1,
      }}
    />
  );
  expect(container.textContent).toContain("content 2");
});

test("renders PassingArt 3", () => {
  const { container } = render(
    <PassingArt
      increasePosition={() => {}}
      nbrPoints={3}
      position={1}
      passingArt={{
        title: "passing art 3",
        mainImage: "main image 3",
        content: "content 3",
        author: {
          username: "Artiste 3",
        },
        createdAt: "2021-09-01",
        position: 1,
      }}
    />
  );
  expect(container.textContent).toContain("passing art 3");
});

test("renders PassingArt 4", () => {
  const { container } = render(
    <PassingArt
      increasePosition={() => {}}
      nbrPoints={3}
      position={1}
      passingArt={{
        title: "passing art 4",
        mainImage: "main image 4",
        content: "content 4",
        author: {
          username: "Artiste 4",
        },
        createdAt: "2021-09-01",
        position: 1,
      }}
    />
  );
  expect(container.textContent).toContain("content 4");
});

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
