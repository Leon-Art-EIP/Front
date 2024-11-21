import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Filters from "../../src/components/explorer/Filters";
import { IFilters } from "../../src/interfaces/explorer/filters";

const filters: IFilters = {
  searchTerm: "",
  artType: "",
  priceRange: "",
  isForSale: false,
  sort: "",
  artPage: 0,
  artLimit: 0,
  artistPage: 0,
  artistLimit: 0,
};

test("ChatBox snapshot", () => {
  testSnapshot(<Filters handleFilters={() => {}} filters={filters} />);
});
