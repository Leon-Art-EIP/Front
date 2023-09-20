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
});
