import ArticleWrapper from "../../../wrappers/article/ArticleWrapper";

export default async function Page(props: { params: { id: string } }): Promise<JSX.Element> {
  return <ArticleWrapper id={props.params.id} />;
}
