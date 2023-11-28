import QuizzWrapper from "../../wrappers/quizz/QuizzWrapper";
import { questionsArtiste, questionsBuyer, questionsCommon } from "../../configs/quizz/questions";

export default function Page(): JSX.Element {
  return (
    <QuizzWrapper
      questionsArtiste={questionsArtiste}
      questionsBuyer={questionsBuyer}
      questionsCommon={questionsCommon}
    />
  );
}
