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
    href: "/chat",
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
  },
  {
    name: "Quizz",
    href: "/quizz",
    loggedIn: true,
    navbar: false,
    verticalNavbar: false,
    header: true,
  },
  {
    name: "Mot de passe oublié",
    href: "/forgotten_password",
    loggedIn: false,
    navbar: false,
    verticalNavbar: false,
    header: false,
  },
  {
    name: "Réinitialiser le mot de passe",
    href: "/reset_password",
    loggedIn: false,
    navbar: false,
    verticalNavbar: false,
    header: false,
  }
];

export default tabs;
