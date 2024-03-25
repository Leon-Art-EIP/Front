import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Heading from "../../src/components/profile/heading/Heading";
import leonart from "../../public/leonart_logo.png";

test("Heading snapshot", () => {
  testSnapshot(<Heading banner={leonart} profilePicture={leonart} />);
});
