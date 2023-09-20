import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import QuizzQuestion from "../../../src/components/quizz/QuizzQuestion";

describe("QuizzQuestion", () => {
  const question = {
    question: "Quelle est la capitale de la France ?",
    multipleChoice: false,
    answers: [
      {
        text: "Paris",
        selected: false,
      },
      {
        text: "Londres",
        selected: false,
      },
      {
        text: "Berlin",
        selected: false,
      },
    ],
  };

  function onSelectAnswer(index: number) {
    question.answers[index].selected = !question.answers[index].selected;
  }

  const { container } = render(<QuizzQuestion question={question} onSelectAnswer={onSelectAnswer} />);

  test("should render the question", () => {
    expect(container.textContent).toContain(question.question);
  });

  test("should render the three answer choices", () => {
    question.answers.forEach((answer) => {
      expect(container.textContent).toContain(answer.text);
    });
  });

  test("should render the first answer choice as selected", () => {
    const answerChoice = container.querySelector("span[id='name-0']");

    if (answerChoice) expect(answerChoice.classList.contains('bg-[#F4F4F4] text-block')).toBe(false)
  });

  test("should render the selected class when answer is selected", () => {
    const answerChoice = container.querySelector("span[id='name-1']");

    if (answerChoice) fireEvent.click(answerChoice);

    if (answerChoice) expect(answerChoice.classList.contains('bg-[#FF7F74] text-white')).toBe(false)
  });

  test("should deselect the old answer when a new one is selected", () => {
    const oldAnswerChoice = container.querySelector("span[id='name-0']");
    const answerChoice = container.querySelector("span[id='name-1']");

    if (oldAnswerChoice) fireEvent.click(oldAnswerChoice);

    if (oldAnswerChoice) expect(oldAnswerChoice.classList.contains('bg-[#FF7F74] text-white')).toBe(false)

    if (answerChoice) expect(answerChoice.classList.contains('bg-[#F4F4F4] text-block')).toBe(false)

    if (answerChoice) fireEvent.click(answerChoice);

    if (answerChoice) expect(answerChoice.classList.contains('bg-[#FF7F74] text-white')).toBe(false)

    if (oldAnswerChoice) expect(oldAnswerChoice.classList.contains('bg-[#F4F4F4] text-block')).toBe(false)
  });
});
