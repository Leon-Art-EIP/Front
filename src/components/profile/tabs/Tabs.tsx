export interface ITabsProps {
  publicationsTabOnClick: () => void;
  collectionsTabOnClick: () => void;
  aboutTabOnClick: () => void;
}

export default function Tabs(props: ITabsProps): JSX.Element {
  return (
    <div className="bg-[#ECECEC] inline-flex gap-2 rounded-full px-1">
      <button
        className="flex-1 text-center rounded-full border-r-2 border-white py-2 pl-3 pr-5"
        onClick={props.publicationsTabOnClick}
      >
        Publications
      </button>
      <button
        className="flex-1 text-center rounded-full border-r-2 border-white py-2 pl-3 pr-5"
        onClick={props.collectionsTabOnClick}
      >
        Collections
      </button>
      <button className="flex-1 text-center rounded-full border-r-2 py-2 pl-3 pr-5" onClick={props.aboutTabOnClick}>
        À propos
      </button>
    </div>
  );
}
