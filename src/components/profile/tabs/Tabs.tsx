import { cn } from "../../../tools/cn";

export interface ITabsProps {
  publicationsTabOnClick: () => void;
  collectionsTabOnClick: () => void;
  aboutTabOnClick: () => void;
  selectedTab: "publications" | "collections" | "about";
}

export default function Tabs(props: ITabsProps): JSX.Element {
  return (
    <div className="relative h-[40px] rounded-full">
      <button
        className={cn(
          "absolute w-1/3 h-full z-20 grid grid-cols-1 items-center border-4 border-white rounded-full text-center",
          props.selectedTab === "publications" ? "bg-primaryRed text-white" : "bg-[#ECECEC]"
        )}
        onClick={props.publicationsTabOnClick}
      >
        Publications
      </button>
      <button
        className={cn(
          "absolute w-2/3 h-full z-10 grid grid-cols-2 items-center border-4 border-white rounded-full",
          props.selectedTab === "collections" ? "bg-primaryRed text-white" : "bg-[#ECECEC]"
        )}
        onClick={props.collectionsTabOnClick}
      >
        <div className="text-center">First div</div>
        <div className="text-center">Collections</div>
      </button>
      <button
        className={cn(
          "absolute w-full h-full z-0 grid grid-cols-3 items-center border-4 border-white rounded-full",
          props.selectedTab === "about" ? "bg-primaryRed text-white" : "bg-[#ECECEC]"
        )}
        onClick={props.aboutTabOnClick}
      >
        <div className="text-center">First div</div>
        <div className="text-center">Second div</div>
        <div className="text-center">A propos</div>
      </button>
    </div>
  );
}
