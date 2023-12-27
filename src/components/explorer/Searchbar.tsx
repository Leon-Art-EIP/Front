import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchbarProps {
  handleSearchTerm: (searchTerm: string) => void;
}

export default function Searchbar(props: SearchbarProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");

  function onSearchTerm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.handleSearchTerm(searchTerm);
  }

  return (
    <form className="relative w-full" onSubmit={onSearchTerm}>
      <input
        className="w-full h-14 bg-gray-100 rounded-3xl pl-16 focus:shadow-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition duration-300 ease-in-out"
        placeholder="Rechercher une oeuvre ou un utilisateur..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button
        type="submit"
        className="p-2 absolute top-2 left-4 hover:opacity-75 rounded-xl transition hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out"
      >
        <SearchIcon />
      </button>
      {searchTerm && (
        <button className="absolute top-2 right-2">
          <ClearIcon className="text-red-400" />
        </button>
      )}
    </form>
  );
}
