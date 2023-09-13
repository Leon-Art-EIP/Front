"use client";

import { useState } from "react";
import QuizzQuestion from "../../components/quizz/QuizzQuestion";

export interface QuizzWrapperProps {}

export default function QuizzWrapper(props: QuizzWrapperProps): JSX.Element {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "Que comptez-vous vendre ?",
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
      question: "Comment avez-vous découvert l’application ?",
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
    {
      question: "Souhaitez-vous proposer des créations personnalisées ? ",
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

  function handleQuestionChange(index: number) {
    setQuestionIndex(index);
  }

  function handleNextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function handlePreviousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function onSelectAnswer(index: number) {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[index].selected = !newQuestions[questionIndex].answers[index].selected;
    setQuestions(newQuestions);
  }

  return (
    <div className="grid grid-cols-1 justify-center items-center">
      <QuizzQuestion question={questions[questionIndex]} onSelectAnswer={onSelectAnswer} />
      <div className="flex items-baseline justify-center flex-row gap-24 w-full fixed bottom-14 select-none">
        <button
          onClick={handlePreviousQuestion}
          className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
          disabled={questionIndex === 0}
          name="previous"
        >
          <span className="cursor-pointer">Précédente</span>
        </button>
        <span className="cursor-default text-2xl">
          {questionIndex + 1}/{questions.length}
        </span>
        <button
          onClick={handleNextQuestion}
          className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
          disabled={questionIndex === questions.length - 1}
          name="previous"
        >
          <span className="cursor-auto">Suivante</span>
        </button>
      </div>
    </div>
  );
}
