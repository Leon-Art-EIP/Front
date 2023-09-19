import { on } from "events";
import { Badge } from "../lib/lib";

export interface QuizzNavigationProps {
  questionIndex: number;
  questionsLength: number;
  setQuestionIndex: (index: number) => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
}

export default function QuizzNavigation(props: QuizzNavigationProps): JSX.Element {
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onNextQuestion() {
    props.handleNextQuestion();
    scrollToTop();
  }

  function onPreviousQuestion() {
    props.handlePreviousQuestion();
    scrollToTop();
  }

  return (
    <div className="flex items-baseline justify-center p-6 md:p-2 gap-8 md:gap-14 xl:gap-24 select-none">
      <button
        onClick={onPreviousQuestion}
        className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
        name="previous"
      >
        <span className="cursor-pointer">Précédente</span>
      </button>
      <span className="cursor-default text-2xl">
        {props.questionIndex + 1}/{props.questionsLength}
      </span>
      <button
        onClick={onNextQuestion}
        className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
        name="previous"
      >
        <span className="cursor-auto">Suivante</span>
      </button>
    </div>
  );
}
