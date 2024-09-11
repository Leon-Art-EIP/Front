import PostsWrapper from "../../../wrappers/posts/PostsWrapper";

export default function Page(): JSX.Element {
  return (
    <div className="flex">
      <div className="flex-1" />
      <div className="flex flex-col pt-4 gap-4">
        <h1>Posts</h1>
        <PostsWrapper filter="user" />
      </div>
      <div className="flex-1" />
    </div>
  );
}
