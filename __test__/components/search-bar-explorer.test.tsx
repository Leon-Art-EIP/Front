import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Searchbar from "../../src/components/explorer/Searchbar";

test("Search bar explorer snapshot", () => {
  testSnapshot(<Searchbar handleSearchTerm={() => {}} />);
});
