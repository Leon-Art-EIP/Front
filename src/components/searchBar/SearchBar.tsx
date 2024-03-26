import SearchIcon from "@mui/icons-material/Search";

/* c8 ignore start */
export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
  return (
    <div className="w-full">
      <div className="relative flex items-center w-full h-12 rounded-3xl focus-within:shadow-lg bg-secondary overflow-hidden">
        <input
          className="peer h-full w-full outline-none text-md placeholder-gray-600 pl-6"
          type="text"
          id="search"
          placeholder="Rechercher ..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <SearchIcon></SearchIcon>
        </div>
      </div>
    </div>
  );
}
/* c8 ignore end */
