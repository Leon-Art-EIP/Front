import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { Card } from "../../src/components/lib";

test("Card snapshot - Basic usage", () => {
  testSnapshot(
    <Card title="Test Card">
      <p>This is a test content inside the card.</p>
    </Card>
  );
});

test("Card snapshot - With long content", () => {
  testSnapshot(
    <Card title="Detailed Card">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
        dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
      </p>
    </Card>
  );
});

test("Card snapshot - Empty children", () => {
  testSnapshot(<Card title="Empty Card">{null}</Card>);
});
