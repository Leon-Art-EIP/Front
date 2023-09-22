import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import QuizzWrapper from "../../../src/wrappers/quizz/QuizzWrapper";
import { questionsArtiste, questionsBuyer, questionsCommon } from "../../../src/configs/quizz/questions";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("QuizzWrapper", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <QuizzWrapper
        questionsArtiste={questionsArtiste}
        questionsBuyer={questionsBuyer}
        questionsCommon={questionsCommon}
      />
    ).container;
  });

  test("should render the QuizzStarter component when quizz wrapper is loaded", () => {
    expect(container.textContent).toContain("Bienvenue !");
    expect(container.textContent).toContain("Découvrir oeuvres d’art");
    expect(container.textContent).toContain("Vendre mes oeuvres d’art");
    expect(container.textContent).toContain("Les deux !");
    const startButton = container.querySelector("button[name='start']");
    expect(startButton).toHaveProperty("disabled", true);
  });

  test("should render the QuizzQuestion and QuizzNavigation component if QuizzStarter start", () => {
    // QuizzStarter start the quizz
    const answerChoice = container.querySelector("span[id='name-0']");
    if (answerChoice) fireEvent.click(answerChoice);
    
    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);
    
    // QuizzQuestion
    expect(container.textContent).toContain("Quel type d’art vous intéresse ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
    
    // QuizzNavigation
    expect(container.textContent).toContain("Précédente");
    expect(container.textContent).toContain("Suivante");
    const nextButton = container.querySelector("button[name='next']");
    expect(nextButton).not.toBeNull();
    const previousButton = container.querySelector("button[name='previous']");
    expect(previousButton).not.toBeNull();
  });
  
  test("should render questionsBuyer when artiste is selected in QuizzStarter", () => {
    // Choose buyer in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-0']");
    if (answerChoice) fireEvent.click(answerChoice);
    
    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);

    // QuizzQuestion questionsArtistes
    expect(container.textContent).toContain("Quel type d’art vous intéresse ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  });

  test("should render questionsArtistes when artiste is selected in QuizzStarter", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-1']");
    if (answerChoice) fireEvent.click(answerChoice);
    
    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);

    // QuizzQuestion questionsArtistes
    expect(container.textContent).toContain("Que comptez-vous vendre ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  });

  test("should render the QuizzResult component when all questions are answered", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-1']");
    if (answerChoice) fireEvent.click(answerChoice);
  
    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);
  
    // Answer all questions
    const answer1 = container.querySelector("label[for='answer-0-0']");
    if (answer1) fireEvent.click(answer1);
    const answer2 = container.querySelector("label[for='answer-1-0']");
    if (answer2) fireEvent.click(answer2);
    const answer3 = container.querySelector("label[for='answer-2-0']");
    if (answer3) fireEvent.click(answer3);
  });
  
  test("should navigate to the next question when clicking the next button", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-1']");
    if (answerChoice) fireEvent.click(answerChoice);
  
    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);
  
    // QuizzQuestion 1
    expect(container.textContent).toContain("Que comptez-vous vendre ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  
    // Click next button
    const nextButton = container.querySelector("button[name='next']");
    if (nextButton) fireEvent.click(nextButton);
  
    // QuizzQuestion 2
    expect(container.textContent).toContain("Souhaitez-vous proposer des créations personnalisées ?");
    expect(container.textContent).toContain("Oui !");
    expect(container.textContent).toContain("Non");
    expect(container.textContent).toContain("Peut-être plus tard");
  });
  
  test("should navigate to the previous question when clicking the previous button", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-1']");
    if (answerChoice) fireEvent.click(answerChoice);
  
    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);
  
    // QuizzQuestion 1
    expect(container.textContent).toContain("Que comptez-vous vendre ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  
    // Click next button
    const nextButton = container.querySelector("button[name='next']");
    if (nextButton) fireEvent.click(nextButton);
  
    // QuizzQuestion 2
    expect(container.textContent).toContain("Souhaitez-vous proposer des créations personnalisées ?");
    expect(container.textContent).toContain("Oui !");
    expect(container.textContent).toContain("Non");
    expect(container.textContent).toContain("Peut-être plus tard");
  
    // Click previous button
    const previousButton = container.querySelector("button[name='previous']");
    if (previousButton) fireEvent.click(previousButton);
  
    // QuizzQuestion 1
    expect(container.textContent).toContain("Que comptez-vous vendre ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  });
});
