import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import IconButton from "../../src/components/single-art-page/artwork/IconButton";
import { Upcoming } from "@mui/icons-material";

test("IconButton snapshot", () => {
  testSnapshot(<IconButton backgroundColor="white" icon={Upcoming} iconColor="black" className="text-center" />);
});
