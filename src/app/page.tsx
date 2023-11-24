import { Test } from "../components/test";

export default function Page(): JSX.Element {
  let n = 0;
  let arr = ["test"];

  let result = n + arr.length;

  return (
    <>
      <h1>Application réalisée avec Next.js</h1>
      <Test r={result} />
    </>
  );
}
