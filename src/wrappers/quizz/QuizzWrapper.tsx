"use client";

import { useState } from "react";
import QuizzQuestion from "../../components/quizz/QuizzQuestion";
import QuizzNavigation from "../../components/quizz/QuizzNavigation";
import QuizzStarter from "../../components/quizz/QuizzStarter";

export interface QuizzWrapperProps {}

export default function QuizzWrapper(props: QuizzWrapperProps): JSX.Element {
  const [quizzStarted, setQuizzStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
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

  return (
    <div className="flex flex-col justify-center items-center">
      {!quizzStarted ? (
        <QuizzStarter />
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
