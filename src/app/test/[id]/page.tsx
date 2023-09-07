export default function Page(props: { params: { id: string } }): JSX.Element {
  // const id = Number(props.params.id); // if you want to use the id as a number

  return (
    <div>
      <h1 className="text-primaryRed">Test page with ID: {props.params.id}</h1>
    </div>
  );
}
