import { useState } from "react";

export interface QuizzStarterProps {}

export default function QuizzStarter(props: QuizzStarterProps): JSX.Element {
  const [title, setTitle] = useState("Bienvenue !");
  const [question, setQuestion] = useState("Avec Leon’Art, vous souhaitez...");
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
  const[readyToStart, setReadyToStart] = useState(false);

  return (
    <>
      <div className="flex flex-col pt-10 gap-20">
        <span className="text-5xl font-bold mx-32 text-center">{title}</span>
        <span className="text-3xl font-semibold px-32">{question}</span>
        <div className="flex flex-col items-center gap-10 select-none">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
            {answers.map((answer, index) => (
              <span
                className={` px-6 py-4 rounded-[60px] cursor-pointer hover:bg-[#fca199] hover:text-white ${
                  answer.selected ? "bg-[#FF7F74] text-white" : "bg-[#F4F4F4] text-black"
                }`}
                onClick={() => {}}
                key={index}
              >
                <span className="text-lg">{answer.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-baseline justify-center flex-row gap-24 w-full fixed bottom-14 select-none">
        <button
          onClick={() => {}}
          className="hidden py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
          disabled={true}
          name="previous"
        >
          <span className="cursor-pointer">Précédente</span>
        </button>
        <span className="hidden cursor-default text-2xl">
          {0 + 1}/{1}
        </span>
        <button
          onClick={() => {}}
          className="py-3 px-16 rounded-[30px] shadow-lg bg-[#E11C0A] text-white mt-10 hover:bg-[#c51708] disabled:bg-gray-300"
          disabled={readyToStart}
          name="start"
        >
          <span className="cursor-auto">Commencer</span>
        </button>
      </div>
    </>
  );
}
