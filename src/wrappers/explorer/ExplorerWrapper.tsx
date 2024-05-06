"use client";

import { useEffect, useState } from "react";
import Filters from "../../components/explorer/Filters";
import PriceFilters from "../../components/explorer/PriceFilters";
import Searchbar from "../../components/explorer/Searchbar";
import UsersSlider from "../../components/explorer/UsersSlider";
import Gallery4x4 from "../../components/gallery/Gallery4x4";
import { IFilters } from "../../interfaces/explorer/filters";
import { IUsers } from "../../interfaces/explorer/users";
import { IArtPublications } from "../../interfaces/gallery/artPublications";
import { myFetch } from "../../tools/myFetch";

export default function ExplorerWrapper(): JSX.Element {
  const [artPubs, setArtPubs] = useState<IArtPublications>({ artPublications: [] });
  const [filteredArtPubs, setFilteredArtPubs] = useState<IArtPublications>({ artPublications: [] });

  const [users, setUsers] = useState<IUsers>({ users: [] });
  const [filteredUsers, setFilteredUsers] = useState<IUsers>({ users: [] });

  const [filters, setFilters] = useState<IFilters>({
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

  function createQueryStringForFetch(filters: IFilters): string {
    return `?${filters.searchTerm ? `searchTerm=${filters.searchTerm}&` : ""}${
      filters.artType ? `artType=${filters.artType}&` : ""
    }${filters.priceRange ? `priceRange=${filters.priceRange}&` : ""}${
      filters.isForSale ? `isForSale=${filters.isForSale}&` : ""
    }${filters.sort ? `sort=${filters.sort}&` : ""}${filters.artPage ? `artPage=${filters.artPage}&` : ""}${
      filters.artLimit ? `artLimit=${filters.artLimit}&` : ""
    }${filters.artistPage ? `artistPage=${filters.artistPage}&` : ""}${
      filters.artistLimit ? `artistLimit=${filters.artistLimit}` : ""
    }`.slice(0, -1);
  }

  useEffect(() => {
    async function fetchArtPub() {
      const queryString = createQueryStringForFetch(filters);
      const res = await myFetch({ route: `/api/explorer/search${queryString}`, method: "GET" });
      if (res.ok) {
        const data = res.json;
        setArtPubs(data);
        setFilteredArtPubs(data);
        setUsers(data);
        setFilteredUsers(data);
      }
    }

    fetchArtPub();
  }, [filters]);

  function handleSearchTerm(searchTerm: string) {
    setFilters({ ...filters, searchTerm: searchTerm });
  }

  function handleFilters(filters: IFilters) {
    setFilters({ ...filters });
    console.log("filters", filters);
  }

  return (
    <div className="flex justify-center bg-background">
      <div className="flex flex-col max-w-[1500px] w-full items-center gap-4 lg:py-8 py-4 lg:px-10 px-6">
        <div className="flex flex-row w-full gap-4">
          <Searchbar handleSearchTerm={handleSearchTerm} />
          <Filters handleFilters={handleFilters} filters={filters} />
        </div>
        <PriceFilters handleFilters={handleFilters} filters={filters} />
        <span className="w-2/3 h-1 bg-secondary rounded-full"></span>
        <div className="flex flex-col self-start gap-4 w-full">
          <span className="text-3xl font-bold text-tertiary">Artistes</span>
          <UsersSlider users={filteredUsers} />
        </div>
        <span className="w-2/3 h-1 bg-secondary rounded-full"></span>
        <div className="flex flex-col self-start gap-4 w-full">
          <span className="text-3xl font-bold text-tertiary">Publication d{"'"}arts</span>
          <Gallery4x4 artPublications={filteredArtPubs} />
        </div>
      </div>
    </div>
  );
}
