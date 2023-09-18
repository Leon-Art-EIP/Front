"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import QuizzQuestion from "../../components/quizz/QuizzQuestion";
import QuizzNavigation from "../../components/quizz/QuizzNavigation";
import QuizzStarter from "../../components/quizz/QuizzStarter";

export interface QuizzWrapperProps {}

interface Question {
  question: string;
  multipleChoice: boolean;
  answers: {
    text: string;
    selected: boolean;
  }[];
}

export default function QuizzWrapper(props: QuizzWrapperProps): JSX.Element {
  const router = useRouter();
  const [quizzStarted, setQuizzStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsCommon, setQuestionsCommon] = useState([
    {
      question: "Comment avez-vous découvert l’application ?",
      multipleChoice: true,
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
  ]);
  const [questionsArtiste, setQuestionsArtiste] = useState([
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
      question: "Souhaitez-vous proposer des créations personnalisées ? ",
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
          text: "Peut-être plus tard ",
          selected: false,
        },
      ],
    },
  ]);
  const [questionsBuyer, setQuestionsBuyer] = useState([
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
  ]);

  function handleNextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (questionIndex === questions.length - 1) {
      router.push("/");
    }
  }

  function handlePreviousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (questionIndex === 0) {
      setQuizzStarted(false);
      setQuestions([]);
    }
  }

  function onSelectAnswer(index: number) {
    if (questions[questionIndex].multipleChoice) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers[index].selected = !newQuestions[questionIndex].answers[index].selected;
      setQuestions(newQuestions);
    } else {
      const newQuestions = [...questions];
      for (let i = 0; i < newQuestions[questionIndex].answers.length; i++) {
        if (i !== index) {
          newQuestions[questionIndex].answers[i].selected = false;
        }
      }
      newQuestions[questionIndex].answers[index].selected = !newQuestions[questionIndex].answers[index].selected;
      setQuestions(newQuestions);
    }
  }

  function onSelectAnswerQuizzStarter(index: number) {
    console.log("index", index);
    if (index === 0) {
      setQuestions([...questionsArtiste, ...questionsCommon]);
    } else if (index === 1) {
      setQuestions([...questionsBuyer, ...questionsCommon]);
    } else if (index === 2) {
      setQuestions([...questionsArtiste, ...questionsBuyer, ...questionsCommon]);
    }
    setQuizzStarted(true);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {!quizzStarted ? (
        <QuizzStarter onSelectAnswerQuizzStarter={onSelectAnswerQuizzStarter} />
      ) : (
        <>
          <QuizzQuestion question={questions[questionIndex]} onSelectAnswer={onSelectAnswer} />
          <QuizzNavigation
            questionIndex={questionIndex}
            questionsLength={questions.length}
            setQuestionIndex={setQuestionIndex}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
          />
        </>
      )}
    </div>
  );
}
