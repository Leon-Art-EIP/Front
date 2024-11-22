import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Publications from "../../src/components/profile/publications/Publications";
import Link from "../../src/components/link/Link";
import leonart from "../../public/leonart_logo.png";

test("Publications snapshot", () => {
  testSnapshot(
    <Publications
      link={Link}
      profileArts={[
        {
          id: "1",
          src: leonart,
        },
      ]}
    />
  );
});
