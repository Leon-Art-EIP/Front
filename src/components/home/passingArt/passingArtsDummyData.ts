import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.jpg";
import { IPassingArt } from "../../../interfaces/home/passingArt";

export const passingArts: IPassingArt[] = [
  {
    title:
      "Ceci est la première oeuvre d'une longue série et je suis un très gros titre est-ce que je suis un gros titre oui",
    mainImage: banner1,
    content:
      "Le contenu de cette oeuvre est très intéressant car il met en oeuvre des choses très intéressantes comme par exemple quels sont les choses les plus intéressantes des oeuvres intéressantes. Mais ce n'est pas tout car c'est aussi ici que vous retrouverez un tas de choses intéressantes comme toutes ces oeuvres intéressantes qu'on a rarement l'occasion de voir. Et c'est pas tout car c'est aussi de là que viennent les oeuvres très intéressantes comme par exemple la Joconde ou Le Cri.",
    author: {
      username: "John Doe",
    },
    createdAt: "2021-01-01",
    position: 1,
  },
  {
    title: "Ceci est une super oeuvre qui est top",
    mainImage: banner2,
    content: "Veuillez découvrir cette oeuvre",
    author: {
      username: "Jean Dupont",
    },
    createdAt: "2021-04-04",
    position: 2,
  },
  {
    title: "Un arbre au milieu de l'eau",
    mainImage: banner3,
    content: "Pour tous les écologistes",
    author: {
      username: "Jeanne Oscar",
    },
    createdAt: "2021-07-10",
    position: 3,
  },
];
