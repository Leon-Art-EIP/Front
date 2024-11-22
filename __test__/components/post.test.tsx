import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Post from "../../src/components/posts/Post";
import { IPost } from "../../src/interfaces/posts";

const post: IPost = {
  userId: "1",
  text: "text",
  artPublicationId: "1",
  createdAt: "2021-09-01",
  likes: [],
  id: "1",
  user: {
    username: "username",
    profilePicture: "profilePicture",
  },
  artPublication: {
    name: "name",
  },
};

test("Post deleteLoading snapshot", () => {
  testSnapshot(<Post connectedUserId="1" isDeleteLoading onDelete={() => {}} onLike={() => {}} post={post} />);
});

test("Post snapshot", () => {
  testSnapshot(<Post connectedUserId="1" isDeleteLoading={false} onDelete={() => {}} onLike={() => {}} post={post} />);
});
