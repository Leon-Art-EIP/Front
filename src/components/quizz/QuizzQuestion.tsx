import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";

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
  const [isGeolocationEnabled, setGeolocationEnabled] = useState(false);
  const [location, setLocation] = useState<string>("");

  const handleGeolocationSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setGeolocationEnabled(isChecked);
    if (isChecked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          },
          (error) => {
            console.error("Error getting location: ", error);
            alert("Erreur lors de la tentative de récupération de votre localisation.");
          }
        );
      } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    } else {
      setLocation("");
    }
  };

  return (
    <div className="flex flex-col mt-5 gap-20">
      <span className="text-3xl font-semibold px-14 lg:px-32">{props.question.question}</span>
      <div className="flex flex-col items-center gap-10 select-none">
        <div className="flex flex-wrap flex-col lg:flex-row items-center justify-center w-1/2 gap-x-10 gap-y-5">
          {/* c8 ignore start */}
          {props.question.answers.map((answer, index) => (
            <span
              className={`text-center px-6 py-4 rounded-[60px] cursor-pointer hover:bg-[#fca199] hover:text-white ${
                answer.selected ? "bg-[#FF7F74] text-white" : "bg-[#F4F4F4] text-black"
              }`}
              onClick={() => props.onSelectAnswer(index)}
              key={index}
              id={`name-${index}`}
            >
              <span className="text-lg">{answer.text}</span>
            </span>
          ))}
          {/* c8 ignore stop */}
        </div>
        <FormGroup className="px-6 lg:px-0">
          <FormControlLabel
            control={<Switch checked={isGeolocationEnabled} onChange={handleGeolocationSwitch} />}
            label="Localiser ma position et optimiser mon référencement sur l’application"
          />
        </FormGroup>
      </div>
    </div>
  );
}
