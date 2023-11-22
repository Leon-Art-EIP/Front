import { ITab } from "../interfaces";

const tabs: ITab[] = [
  {
    name: "Accueil",
    href: "/",
    loggedIn: true,
  },
  {
    name: "Explorer",
    href: "/explore",
    loggedIn: true,
  },
  {
    name: "Messagerie",
    href: "/messages",
    loggedIn: true,
  },
  {
    name: "Commandes",
    href: "/purchase",
    loggedIn: true,
  },
  {
    name: "Profil",
    href: "/profile",
    loggedIn: true,
    hidden: true,
  }
];

export default tabs;
