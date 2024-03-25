import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import leonart from "../../public/leonart_logo.png";
import ProfilePicture from "../../src/components/profile/profilePicture/ProfilePicture";

test("ProfilePicture snapshot", () => {
  testSnapshot(<ProfilePicture src={leonart} />);
});
