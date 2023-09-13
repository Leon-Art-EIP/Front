import { Badge } from "../lib/lib";

export interface QuizzNavigationProps {
  questionIndex: number;
  questionsLength: number;
  setQuestionIndex: (index: number) => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
}

export default function QuizzNavigation(props: QuizzNavigationProps): JSX.Element {
  return (
    <div className="flex items-baseline justify-center flex-row gap-24 w-full fixed bottom-14 select-none">
      <button
        onClick={props.handlePreviousQuestion}
        className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
        disabled={props.questionIndex === 0}
        name="previous"
      >
        <span className="cursor-pointer">Précédente</span>
      </button>
      <span className="cursor-default text-2xl">
        {props.questionIndex + 1}/{props.questionsLength}
      </span>
      <button
        onClick={props.handleNextQuestion}
        className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
        disabled={props.questionIndex === props.questionsLength - 1}
        name="previous"
      >
        <span className="cursor-auto">Suivante</span>
      </button>
    </div>
  );
}
