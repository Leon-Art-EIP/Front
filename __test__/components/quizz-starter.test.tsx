import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import QuizzStarter from "../../src/components/quizz/QuizzStarter";

test("QuizzStarter snapshot", () => {
  testSnapshot(<QuizzStarter onSelectAnswerQuizzStarter={() => {}} />);
});
