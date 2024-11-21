import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import QuizzNavigation from "../../src/components/quizz/QuizzNavigation";

test("QuizzNavigation snapshot", () => {
  testSnapshot(
    <QuizzNavigation
      handleNextQuestion={() => {}}
      handlePreviousQuestion={() => {}}
      questionIndex={1}
      questionsLength={3}
    />
  );
});
