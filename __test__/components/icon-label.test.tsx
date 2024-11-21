import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import IconLabel from "../../src/components/label/IconLabel";
import { Upcoming } from "@mui/icons-material";

test("IconLabel snapshot", () => {
  testSnapshot(<IconLabel icon={Upcoming} text="test" />);
});
