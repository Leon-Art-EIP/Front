export default function Page(props: { params: { id: string } }): JSX.Element {
  return <div>profile user {props.params.id}</div>;
}
