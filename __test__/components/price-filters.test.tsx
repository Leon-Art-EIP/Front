import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { IFilters } from "../../src/interfaces/explorer/filters";
import PriceFilters from "../../src/components/explorer/PriceFilters";

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

test("PriceFilters unavailableToBuy snapshot", () => {
  testSnapshot(
    <PriceFilters filters={filters} handleFilters={() => {}} setUnavailableToBuy={() => {}} unavailableToBuy />
  );
});

test("PriceFilters snapshot", () => {
  testSnapshot(
    <PriceFilters filters={filters} handleFilters={() => {}} setUnavailableToBuy={() => {}} unavailableToBuy={false} />
  );
});
