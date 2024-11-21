import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { SearchBar } from "../../src/components/searchBar/SearchBar";

test("SearchBar snapshot", () => {
  testSnapshot(<SearchBar onSearch={() => {}} />);
});
