import { ITab } from "../interfaces";

const tabs: ITab[] = [
  {
    name: "Accueil",
    href: "/",
    loggedIn: true,
    navbar: true,
    verticalNavbar: true,
    header: true,
  },
  {
    name: "Explorer",
    href: "/explore",
    loggedIn: true,
    navbar: true,
    verticalNavbar: true,
    header: true,
  },
  {
    name: "Messagerie",
    href: "/messages",
    loggedIn: true,
    navbar: true,
    verticalNavbar: true,
    header: true,
  },
  {
    name: "Commandes",
    href: "/purchase",
    loggedIn: true,
    navbar: true,
    verticalNavbar: true,
    header: true,
  },
  {
    name: "Profil",
    href: "/profile",
    loggedIn: true,
    navbar: false,
    verticalNavbar: true,
    header: true,
  },
  {
    name: "Paramètres",
    href: "/settings",
    loggedIn: true,
    navbar: false,
    verticalNavbar: true,
    header: true,
  },
  {
    name: "Connexion",
    href: "/login",
    loggedIn: false,
    navbar: false,
    verticalNavbar: false,
    header: false,
  },
  {
    name: "Inscription",
    href: "/register",
    loggedIn: false,
    navbar: false,
    verticalNavbar: false,
    header: false,
  }
];

export default tabs;
