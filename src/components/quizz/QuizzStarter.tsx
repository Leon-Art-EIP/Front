import { useState } from "react";

export interface QuizzStarterProps {
  onSelectAnswerQuizzStarter: (index: number) => void;
}

export default function QuizzStarter(props: QuizzStarterProps): JSX.Element {
  const [answers, setAnswers] = useState([
    {
      text: "Découvrir oeuvres d’art",
      selected: false,
    },
    {
      text: "Vendre mes oeuvres d’art",
      selected: false,
    },
    {
      text: "Les deux !",
      selected: false,
    },
  ]);
  const [readyToStart, setReadyToStart] = useState(false);
  const isBrowser = () => typeof window !== "undefined";

  function selectAnswer(index: number) {
    const newAnswer = [...answers];
    for (let i = 0; i < answers.length; i++) {
      if (i !== index) {
        newAnswer[i].selected = false;
      }
    }
    newAnswer[index].selected = !newAnswer[index].selected;
    setAnswers(newAnswer);
    setReadyToStart(true);
  }

  function startQuizz() {
    props.onSelectAnswerQuizzStarter(answers.findIndex((answer) => answer.selected));
  }

  return (
    <>
      <div className="flex flex-col pt-10 gap-20">
        <span className="text-5xl font-bold mx-32 text-center whitespace-nowrap">Bienvenue !</span>
        <span className="text-3xl font-semibold px-32">Avec Leon’Art, vous souhaitez...</span>
        <div className="flex lg:flex-wrap flex-col lg:flex-row items-center gap-x-10 gap-y-5 px-8 lg:px-0 select-none">
          {answers.map((answer, index) => (
            <span
              className={`px-6 py-4 rounded-[60px] cursor-pointer hover:bg-[#fca199] hover:text-white ${
                answer.selected ? "bg-[#FF7F74] text-white" : "bg-[#F4F4F4] text-black"
              }`}
              onClick={() => selectAnswer(index)}
              key={index}
              id={`name-${index}`}
            >
              <span className="text-lg">{answer.text}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-baseline justify-center flex-row my-10 lg:mt-24 w-full select-none">
        <button
          onClick={startQuizz}
          className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
          disabled={!readyToStart}
          name="start"
        >
          <span className="cursor-pointer">Commencer</span>
        </button>
      </div>
    </>
  );
}
