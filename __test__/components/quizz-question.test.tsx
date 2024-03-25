import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import QuizzQuestion from "../../src/components/quizz/QuizzQuestion";

test("QuizzQuestion snapshot", () => {
  testSnapshot(
    <QuizzQuestion
      location="alert"
      onSelectAnswer={() => {}}
      question={{
        question: "question",
        multipleChoice: false,
        answers: [{ text: "answer", selected: false }],
      }}
      setLocation={() => {}}
    />
  );
});
