import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import VerticalNavbar from "../../src/components/navbar/VerticalNavbar";

const mockLink = ({ children, href }: { children: JSX.Element; href: string }) => <a href={href}>{children}</a>;

const mockTabs = [
  { name: "Home", href: "/home", loggedIn: true, navbar: true, verticalNavbar: true, header: false },
  { name: "Profile", href: "/profile", loggedIn: true, navbar: false, verticalNavbar: true, header: false },
  { name: "Settings", href: "/settings", loggedIn: true, navbar: false, verticalNavbar: true, header: true },
];

test("VerticalNavbar snapshot with open menu", () => {
  testSnapshot(<VerticalNavbar tabs={mockTabs} selectedTabHref="/profile" link={mockLink} userId="123" />);
});

test("VerticalNavbar snapshot with closed menu", () => {
  testSnapshot(<VerticalNavbar tabs={mockTabs} selectedTabHref="/home" link={mockLink} userId="456" />);
});

test("VerticalNavbar snapshot with no tabs", () => {
  testSnapshot(<VerticalNavbar tabs={[]} selectedTabHref="/" link={mockLink} userId="789" />);
});
