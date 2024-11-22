import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import DeletePostModal from "../../src/components/posts/DeletePostModal";

test("StatusBadge snapshot - open state", () => {
  testSnapshot(<DeletePostModal handleClose={() => {}} handleDelete={() => {}} />);
});
