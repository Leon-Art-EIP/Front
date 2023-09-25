import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import QuizzStarter from "../../../src/components/quizz/QuizzStarter";

describe("QuizzStarter", () => {
  const { container } = render(<QuizzStarter onSelectAnswerQuizzStarter={() => {}} />);

  test("should render the QuizzStarter component", () => {
    expect(container.textContent).toContain("Bienvenue !");
  });

  test("should render the three start questions", () => {
    expect(container.textContent).toContain("Découvrir oeuvres d’art");
    expect(container.textContent).toContain("Vendre mes oeuvres d’art");
    expect(container.textContent).toContain("Les deux !");
  });

  test("should render the start button disabled when no answer choice is selected", () => {
    const startButton = container.querySelector("button[name='start']");

    expect(startButton).toHaveProperty("disabled", true);
  });

  test("should render the start button enabled when an answer choice is selected", () => {
    const answerChoice = container.querySelector("span[id='name-0']");

    if (answerChoice) fireEvent.click(answerChoice);

    const startButton = container.querySelector("button[name='start']");

    expect(startButton).toHaveProperty("disabled", false);
  });
});
