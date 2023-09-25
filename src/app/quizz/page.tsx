import QuizzWrapper from "../../wrappers/quizz/QuizzWrapper";
import { questionsArtiste, questionsBuyer, questionsCommon } from "../../configs/quizz/questions";

export default function Page(): JSX.Element {
  return (
    <div>
      {/* Navbar to be removed */}
      <div className="h-24 flex items-center justify-between px-8 border-b-[1px] overflow-hidden">
        <div className="text-2xl">
          <span className="text-[#E11C0A]">Leon</span>
          <span className="text-[#000000]">'Art</span>
        </div>
        <div className="flex text-xl gap-16">
          <span className="text-[#E11C0A]">Accueil</span>
          <span className="text-[#000000]">Explorer</span>
          <span className="text-[#000000]">Messagerie</span>
          <span className="text-[#000000]">Commandes</span>
        </div>
        <div className="text-xl">
          <img
            className="w-14 h-14 rounded-full"
            src="https://toppng.com/uploads/preview/happy-black-person-11531493747ib42obkabb.png"
          />
        </div>
      </div>
      <QuizzWrapper
        questionsArtiste={questionsArtiste}
        questionsBuyer={questionsBuyer}
        questionsCommon={questionsCommon}
      />
    </div>
  );
}
