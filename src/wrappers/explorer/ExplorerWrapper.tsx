"use client";

import { useEffect, useState } from "react";
import Searchbar from "../../components/explorer/Searchbar";
import SearchbarFilter from "../../components/explorer/SearchbarFilter";
import FiltersApplied from "../../components/explorer/FiltersApplied";
import Gallery4x4 from "../../components/gallery/Gallery4x4";
import { myFetch } from "../../tools/myFetch";
import { IArtPublications } from "../../interfaces/gallery/artPublications";
import { ISearchbarFilters } from "../../interfaces/explorer/searchbarFilters";
import { IUsers } from "../../interfaces/explorer/users";
import UsersSlider from "../../components/explorer/UsersSlider";

export default function ExplorerWrapper(): JSX.Element {
  const [artPubs, setArtPubs] = useState<IArtPublications>({ artPublications: [] });
  const [filteredArtPubs, setFilteredArtPubs] = useState<IArtPublications>({ artPublications: [] });

  const [users, setUsers] = useState<IUsers>({ users: [] });
  const [filteredUsers, setFilteredUsers] = useState<IUsers>({ users: [] });

  const [filters, setFilters] = useState<ISearchbarFilters>({
    searchTerm: "",
    artType: "",
    priceRange: "",
    isForSale: false,
    sort: "",
    artPage: 1,
    artLimit: 10,
    artistPage: 1,
    artistLimit: 99,
  });

  useEffect(() => {
    async function fetchArtPub() {
      const queryString = `?artPage=${filters.artPage}&artLimit=${filters.artLimit}&artistPage=${filters.artistPage}&artistLimit=${filters.artistLimit}`;
      const res = await myFetch({ route: `/api/explorer/search${queryString}`, method: "GET" });
      const data = await res.json();
      setArtPubs(data);
      setFilteredArtPubs(data);
      setUsers(data);
      setFilteredUsers(data);
    }

    fetchArtPub();
  }, [filters]);

  function handleSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, searchTerm: e.target.value });
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[1500px] w-full items-center gap-4 lg:py-8 py-4 lg:px-10 px-6">
        <div className="flex flex-row w-full justify-between">
          <Searchbar />
          <SearchbarFilter />
        </div>
        <FiltersApplied />
        <span className="w-2/3 h-1 bg-gray-200 rounded-full"></span>
        <div className="flex flex-col self-start gap-4 w-full">
          <span className="text-3xl font-bold">Artistes</span>
          <UsersSlider users={filteredUsers} />
        </div>
        <span className="w-2/3 h-1 bg-gray-200 rounded-full"></span>
        <div className="flex flex-col self-start gap-4 w-full">
          <span className="text-3xl font-bold">Publication d{"'"}arts</span>
          <Gallery4x4 artPublications={filteredArtPubs} />
        </div>
      </div>
    </div>
  );
}
