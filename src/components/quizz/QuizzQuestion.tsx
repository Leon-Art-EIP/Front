import { Badge } from "../lib/lib";

export interface QuizzQuestionProps {
  question: {
    question: string;
    answers: {
      text: string;
      selected: boolean;
    }[];
  };
  onSelectAnswer: (index: number) => void;
}

export default function QuizzQuestion(props: QuizzQuestionProps): JSX.Element {
  return (
    <div className="flex flex-col mt-24 gap-20">
      <span className="text-3xl font-semibold mx-32">{props.question.question}</span>
      <div className="flex justify-center select-none">
        <div className="flex flex-wrap justify-center w-1/2 gap-x-10 gap-y-5">
          {props.question.answers.map((answer, index) => (
            <span
              className={` px-6 py-4 rounded-[60px] cursor-pointer hover:border-[#cd5449] ${
                answer.selected ? "bg-[#FF7F74] text-white" : "bg-[#F4F4F4] text-black"
              }`}
              onClick={() => props.onSelectAnswer(index)}
              key={index}
            >
              <span className="text-lg">{answer.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
