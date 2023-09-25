export interface Question {
  question: string;
  multipleChoice: boolean;
  answers: {
    text: string;
    selected: boolean;
  }[];
}

export const questionsArtiste: Question[] = [
  {
    question: "Que comptez-vous vendre ?",
    multipleChoice: true,
    answers: [
      {
        text: "Peinture",
        selected: false,
      },
      {
        text: "Calligraphie",
        selected: false,
      },
      {
        text: "Photographie",
        selected: false,
      },
      {
        text: "Vêtements",
        selected: false,
      },
      {
        text: "Design graphique",
        selected: false,
      },
      {
        text: "Tattoo",
        selected: false,
      },
      {
        text: "Dessin",
        selected: false,
      },
      {
        text: "Illustration",
        selected: false,
      },
      {
        text: "Sculpture",
        selected: false,
      },
      {
        text: "Ecriture",
        selected: false,
      },
      {
        text: "Video",
        selected: false,
      },
      {
        text: "Autre",
        selected: false,
      },
    ],
  },
  {
    question: "Souhaitez-vous proposer des créations personnalisées ?",
    multipleChoice: false,
    answers: [
      {
        text: "Oui !",
        selected: false,
      },
      {
        text: "Non",
        selected: false,
      },
      {
        text: "Peut-être plus tard",
        selected: false,
      },
    ],
  },
];

export const questionsBuyer: Question[] = [
  {
    question: "Quel type d’art vous intéresse ?",
    multipleChoice: true,
    answers: [
      {
        text: "Peinture",
        selected: false,
      },
      {
        text: "Calligraphie",
        selected: false,
      },
      {
        text: "Photographie",
        selected: false,
      },
      {
        text: "Vêtements",
        selected: false,
      },
      {
        text: "Design graphique",
        selected: false,
      },
      {
        text: "Tattoo",
        selected: false,
      },
      {
        text: "Dessin",
        selected: false,
      },
      {
        text: "Illustration",
        selected: false,
      },
      {
        text: "Sculpture",
        selected: false,
      },
      {
        text: "Ecriture",
        selected: false,
      },
      {
        text: "Video",
        selected: false,
      },
      {
        text: "Autre",
        selected: false,
      },
    ],
  },
  {
    question: "Quel est votre budget ?",
    multipleChoice: false,
    answers: [
      {
        text: "0-100€",
        selected: false,
      },
      {
        text: "100-500€",
        selected: false,
      },
      {
        text: "500-1000€",
        selected: false,
      },
      {
        text: "1000-10000€",
        selected: false,
      },
      {
        text: "Plus de 10000€",
        selected: false,
      },
    ],
  },
];

export const questionsCommon: Question[] = [
  {
    question: "Comment avez-vous découvert l’application ?",
    multipleChoice: false,
    answers: [
      {
        text: "Réseaux sociaux",
        selected: false,
      },
      {
        text: "Salon professionnel",
        selected: false,
      },
      {
        text: "Bouche à oreilles",
        selected: false,
      },
      {
        text: "Autre",
        selected: false,
      },
    ],
  },
];
