"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import QuizzQuestion from "../../components/quizz/QuizzQuestion";
import QuizzNavigation from "../../components/quizz/QuizzNavigation";
import QuizzStarter from "../../components/quizz/QuizzStarter";
import { QuizzResultDTO } from "../../DTOs/quizz/DTO";
import { Question } from "../../configs/quizz/questions";

interface QuizzWrapperProps {
  questionsArtiste: Question[];
  questionsBuyer: Question[];
  questionsCommon: Question[];
}

const NEXT_PUBLIC_BACKEND_URL = "http://back-dev.leonart-dev.ovh";

export default function QuizzWrapper(props: QuizzWrapperProps): JSX.Element {
  const router = useRouter();
  const [quizzPath, setQuizzPath] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(props.questionsCommon);

  function handleNextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (questionIndex === questions.length - 1) {
      onSendResult();
      router.push("/");
    }
  }

  function handlePreviousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (questionIndex === 0) {
      setQuizzPath(-1);
      setQuestions([]);
    }
  }

  /* c8 ignore start */
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
  /* c8 ignore stop */

  function onSelectAnswerQuizzStarter(index: number) {
    if (index === 0) {
      setQuestions([...props.questionsBuyer, ...props.questionsCommon]);
    } else if (index === 1) {
      setQuestions([...props.questionsArtiste, ...props.questionsCommon]);
    } else if (index === 2) {
      setQuestions([...props.questionsBuyer, ...props.questionsArtiste, ...props.questionsCommon]);
    }
    setQuizzPath(index);
  }

  function fillDTOResult(questions: Question[]): QuizzResultDTO {
    const result: QuizzResultDTO = {
      user: "",
      /* c8 ignore next */
      objective: quizzPath === 0 ? "discover" : quizzPath === 1 ? "sell" : "both",
      artInterestType: [],
      artSellingType: [],
      location: "",
      customCommands: "",
      budget: "",
      discoveryMethod: "",
    };

    /* c8 ignore start */
    for (const question of questions) {
      if (question.question === "Quel type d’art vous intéresse ?") {
        for (const answer of question.answers) {
          if (answer.selected) {
            result.artInterestType.push(answer.text);
          }
        }
      } else if (question.question === "Que comptez-vous vendre ?") {
        for (const answer of question.answers) {
          if (answer.selected) {
            result.artSellingType.push(answer.text);
          }
        }
      } else if (question.question === "Comment avez-vous découvert l’application ?") {
        for (const answer of question.answers) {
          if (answer.selected) {
            result.discoveryMethod = answer.text;
          }
        }
      } else if (question.question === "Souhaitez-vous proposer des créations personnalisées ?") {
        for (const answer of question.answers) {
          if (answer.selected) {
            result.customCommands = answer.text;
          }
        }
      } else if (question.question === "Quel est votre budget ?") {
        for (const answer of question.answers) {
          if (answer.selected) {
            result.budget = answer.text;
          }
        }
      }
      /* c8 ignore stop */
    }
    return result;
  }

  async function onSendResult() {
    const result = fillDTOResult(questions);
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/quizz/submit`, {
      method: "POST",
      body: JSON.stringify(result),
    });
    const data = await res.json();
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      {quizzPath === -1 ? (
        <QuizzStarter onSelectAnswerQuizzStarter={onSelectAnswerQuizzStarter} />
      ) : (
        <>
          <QuizzQuestion question={questions[questionIndex]} onSelectAnswer={onSelectAnswer} />
          <QuizzNavigation
            questionIndex={questionIndex}
            questionsLength={questions.length}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
          />
        </>
      )}
    </div>
  );
}
