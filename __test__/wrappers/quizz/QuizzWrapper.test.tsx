import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import QuizzWrapper from "../../../src/wrappers/quizz/QuizzWrapper";
import { questionsArtiste, questionsBuyer, questionsCommon } from "../../../src/configs/quizz/questions";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "basic",
    url: "",
    clone: vi.fn(),
    text: vi.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
    formData: vi.fn(),
  })
);

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  test("should render questionsBuyer when buyer is selected in QuizzStarter", () => {
    // Choose buyer in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-0']");
    if (answerChoice) fireEvent.click(answerChoice);

    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);

    // QuizzQuestion questionsBuyer
    expect(container.textContent).toContain("Quel type d’art vous intéresse ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  });

  test("should render questionsArtiste when artiste is selected in QuizzStarter", () => {
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

  test("should render questionsBuyer + questionsArtiste when both is selected in QuizzStarter", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-2']");
    if (answerChoice) fireEvent.click(answerChoice);

    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);

    // QuizzQuestion questionsBuyer
    expect(container.textContent).toContain("Quel type d’art vous intéresse ?");
    expect(container.textContent).toContain("Peinture");
    expect(container.textContent).toContain("Sculpture");
    expect(container.textContent).toContain("Photographie");
  });

  test("should render QuizzStarter when click on previous when quizz have started", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-1']");
    if (answerChoice) fireEvent.click(answerChoice);

    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);

    // go to QuizzStarter
    const previousButton = container.querySelector("button[name='previous']");
    if (previousButton) fireEvent.click(previousButton);

    // Assert QuizzStarter
    expect(container.textContent).toContain("Bienvenue !");
    expect(container.textContent).toContain("Découvrir oeuvres d’art");
    expect(container.textContent).toContain("Vendre mes oeuvres d’art");
    expect(container.textContent).toContain("Les deux !");
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

  test("sends the result when the quizz is about to end", async () => {
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
    const nextButton1 = container.querySelector("button[name='next']");
    if (nextButton1) fireEvent.click(nextButton1);

    // QuizzQuestion 2
    expect(container.textContent).toContain("Souhaitez-vous proposer des créations personnalisées ?");
    expect(container.textContent).toContain("Oui !");
    expect(container.textContent).toContain("Non");
    expect(container.textContent).toContain("Peut-être plus tard");

    // Click next button
    const nextButton2 = container.querySelector("button[name='next']");
    if (nextButton2) fireEvent.click(nextButton2);

    // QuizzQuestion 3
    expect(container.textContent).toContain("Comment avez-vous découvert l’application ?");
    expect(container.textContent).toContain("Réseaux sociaux");
    expect(container.textContent).toContain("Salon professionnel");
    expect(container.textContent).toContain("Bouche à oreilles");
    expect(container.textContent).toContain("Autre");

    // Click next button
    const nextButton3 = container.querySelector("button[name='next']");
    if (nextButton3) fireEvent.click(nextButton3);

    // Expect fetch to be called with the correct arguments
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(NEXT_PUBLIC_BACKEND_URL + "/api/quizz/submit", {
      method: "POST",
      body: JSON.stringify({
        user: "",
        objective: "sell",
        artInterestType: [],
        artSellingType: [],
        location: "",
        customCommands: "",
        budget: "",
        discoveryMethod: "",
      }),
    });

    // Expect useRouter's push method to be called with the desired route
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("should be able to select multiple answer", () => {
    // Choose artiste in QuizzStarter
    const answerChoice = container.querySelector("span[id='name-1']");
    if (answerChoice) fireEvent.click(answerChoice);

    const startButton = container.querySelector("button[name='start']");
    if (startButton) fireEvent.click(startButton);

    // QuizzQuestion 1
    const answer1 = container.querySelector("label[for='answer-0']");
    if (answer1) fireEvent.click(answer1);
    const answer2 = container.querySelector("label[for='answer-1']");
    if (answer2) fireEvent.click(answer2);

    // Check if multiple-choice answers are toggled
    if (answer1) expect(answer1).toHaveClass("bg-[#FF7F74] text-white");
    if (answer1) expect(answer2).toHaveClass("bg-[#FF7F74] text-white");
  });
});
