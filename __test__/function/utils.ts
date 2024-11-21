import type { ReactTestRendererJSON } from "react-test-renderer";
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from "react-test-renderer";
import { expect } from "vitest";

function toJson(component: renderer.ReactTestRenderer): ReactTestRendererJSON {
  const result = component.toJSON();
  expect(result).toBeDefined();

  return result as ReactTestRendererJSON;
}

export function testSnapshot(element: JSX.Element): void {
  const component = renderer.create(element);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
}
