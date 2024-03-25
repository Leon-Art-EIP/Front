import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import PointsPosition from "../../src/components/home/passingArt/PointsPosition";

test("PointsPosition 0 point snapshot", () => {
  testSnapshot(<PointsPosition nbrPoints={0} position={0} />);
});

test("PointsPosition snapshot", () => {
  testSnapshot(<PointsPosition nbrPoints={10} position={5} />);
});
