import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import LinkButton from "../../src/components/lib/Button/LinkButton";

// Composant de lien simulé pour les tests
const MockLink = ({ children, href }: { children: JSX.Element; href: string }) => (
  <a href={href} className="mock-link">
    {children}
  </a>
);

test("LinkButton primary snapshot", () => {
  testSnapshot(
    <LinkButton link={MockLink} href="/test" type="button" color="primary" width="full">
      Primary Button
    </LinkButton>
  );
});

test("LinkButton secondary snapshot", () => {
  testSnapshot(
    <LinkButton link={MockLink} href="/test" type="button" color="secondary">
      Secondary Button
    </LinkButton>
  );
});

test("LinkButton with loading state snapshot", () => {
  testSnapshot(
    <LinkButton link={MockLink} href="/loading" type="submit" color="info" loading={true}>
      Loading Button
    </LinkButton>
  );
});

test("LinkButton danger snapshot", () => {
  testSnapshot(
    <LinkButton link={MockLink} href="/danger" type="reset" color="danger">
      Danger Button
    </LinkButton>
  );
});
