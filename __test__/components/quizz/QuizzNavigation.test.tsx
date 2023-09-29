import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import QuizzNavigation from "../../../src/components/quizz/QuizzNavigation";

describe("QuizzNavigation", () => {
  const mockHandlePreviousQuestion = vi.fn();
  const mockHandleNextQuestion = vi.fn();

  const props = {
    questionIndex: 1,
    questionsLength: 3,
    handlePreviousQuestion: mockHandlePreviousQuestion,
    handleNextQuestion: mockHandleNextQuestion,
  };

  const { container } = render(<QuizzNavigation {...props} />);

  test("should render the QuizzNavigation component", () => {
    expect(container.textContent).toContain("Précédente");
    expect(container.textContent).toContain("Suivante");
  });

  test("should call the handlePreviousQuestion callback when the previous button is clicked", () => {
    const previousButton = container.querySelector("button[name='previous']");

    if (previousButton) fireEvent.click(previousButton);

    expect(mockHandlePreviousQuestion).toHaveBeenCalledOnce();
  });

  test("should call the handleNextQuestion callback when the next button is clicked", () => {
    const nextButton = container.querySelector("button[name='next']");

    if (nextButton) fireEvent.click(nextButton);

    expect(mockHandleNextQuestion).toHaveBeenCalledOnce();
  });
});
