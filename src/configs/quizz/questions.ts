export interface Question {
  question: string;
  multipleChoice: boolean;
  answers: {
    text: string;
    value: string;
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
        value: "painting",
        selected: false,
      },
      {
        text: "Calligraphie",
        value: "calligraphy",
        selected: false,
      },
      {
        text: "Photographie",
        value: "photography",
        selected: false,
      },
      {
        text: "Vêtements",
        value: "clothing",
        selected: false,
      },
      {
        text: "Design graphique",
        value: "graphic-design",
        selected: false,
      },
      {
        text: "Tattoo",
        value: "tattoo",
        selected: false,
      },
      {
        text: "Dessin",
        value: "drawing",
        selected: false,
      },
      {
        text: "Illustration",
        value: "illustration",
        selected: false,
      },
      {
        text: "Sculpture",
        value: "sculpture",
        selected: false,
      },
      {
        text: "Ecriture",
        value: "writing",
        selected: false,
      },
      {
        text: "Video",
        value: "video",
        selected: false,
      },
      {
        text: "Autre",
        value: "other",
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
        value: "Yes",
        selected: false,
      },
      {
        text: "Non",
        value: "No",
        selected: false,
      },
      {
        text: "Peut-être plus tard",
        value: "Maybe",
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
        value: "painting",
        selected: false,
      },
      {
        text: "Calligraphie",
        value: "calligraphy",
        selected: false,
      },
      {
        text: "Photographie",
        value: "photography",
        selected: false,
      },
      {
        text: "Vêtements",
        value: "clothing",
        selected: false,
      },
      {
        text: "Design graphique",
        value: "graphic-design",
        selected: false,
      },
      {
        text: "Tattoo",
        value: "tattoo",
        selected: false,
      },
      {
        text: "Dessin",
        value: "drawing",
        selected: false,
      },
      {
        text: "Illustration",
        value: "illustration",
        selected: false,
      },
      {
        text: "Sculpture",
        value: "sculpture",
        selected: false,
      },
      {
        text: "Ecriture",
        value: "writing",
        selected: false,
      },
      {
        text: "Video",
        value: "video",
        selected: false,
      },
      {
        text: "Autre",
        value: "other",
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
        value: "0-100",
        selected: false,
      },
      {
        text: "100-500€",
        value: "100-500",
        selected: false,
      },
      {
        text: "500-1000€",
        value: "500-1000",
        selected: false,
      },
      {
        text: "1000-10000€",
        value: "1000-10000",
        selected: false,
      },
      {
        text: "Plus de 10000€",
        value: "more-than-10000",
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
        value: "social-media",
        selected: false,
      },
      {
        text: "Salon professionnel",
        value: "professional-trade-show",
        selected: false,
      },
      {
        text: "Bouche à oreilles",
        value: "word-of-mouth",
        selected: false,
      },
      {
        text: "Autre",
        value: "other",
        selected: false,
      },
    ],
  },
];
