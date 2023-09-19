import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Badge } from "../lib/lib";

export interface QuizzQuestionProps {
  question: {
    question: string;
    multipleChoice: boolean;
    answers: {
      text: string;
      selected: boolean;
    }[];
  };
  onSelectAnswer: (index: number) => void;
}

export default function QuizzQuestion(props: QuizzQuestionProps): JSX.Element {
  return (
    <div className="flex flex-col mt-5 gap-20">
      <span className="text-3xl font-semibold px-14 lg:px-32">{props.question.question}</span>
      <div className="flex flex-col items-center gap-10 select-none">
        <div className="flex flex-wrap flex-col lg:flex-row items-center justify-center w-1/2 gap-x-10 gap-y-5">
          {props.question.answers.map((answer, index) => (
            <span
              className={`text-center px-6 py-4 rounded-[60px] cursor-pointer hover:bg-[#fca199] hover:text-white ${
                answer.selected ? "bg-[#FF7F74] text-white" : "bg-[#F4F4F4] text-black"
              }`}
              onClick={() => props.onSelectAnswer(index)}
              key={index}
            >
              <span className="text-lg">{answer.text}</span>
            </span>
          ))}
        </div>
        <FormGroup className="px-6 lg:px-0">
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Localiser ma position et optimiser mon référencement sur l’application"
          />
        </FormGroup>
      </div>
    </div>
  );
}
