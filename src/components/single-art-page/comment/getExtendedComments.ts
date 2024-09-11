import { IComment, IExtendedComment, TChildExtendedComment } from "../../../interfaces/single/comment";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { myFetch } from "../../../tools/myFetch";
import { imageApi } from "../../../tools/variables";

async function getChildExtendedComments(comment: IComment): Promise<TChildExtendedComment[]> {
  const extendedComments: (TChildExtendedComment | null)[] = await Promise.all(
    comment.nestedComments.map(async (nestedComment) => {
      const response = await myFetch({ route: `/api/user/profile/${nestedComment.userId}`, method: "GET" });

      if (response.ok) {
        const commentAuthor = response.json as IProfileUser;

        return {
          ...nestedComment,
          profilePicture: `${imageApi}/${commentAuthor.profilePicture}`,
          username: commentAuthor.username,
        };
      }

      return null;
    })
  );

  return extendedComments.filter((comment): comment is TChildExtendedComment => comment !== null);
}

export async function getExtendComments(artPublicationComments: IComment[]): Promise<IExtendedComment[]> {
  const unfilteredExtendedComments: (IExtendedComment | null)[] = await Promise.all(
    artPublicationComments.map(async (comment) => {
      const response = await myFetch({ route: `/api/user/profile/${comment.userId}`, method: "GET" });

      if (response.ok) {
        const commentAuthor = response.json as IProfileUser;
        const nestedComments = await getChildExtendedComments(comment);

        return {
          ...comment,
          profilePicture: `${imageApi}/${commentAuthor.profilePicture}`,
          username: commentAuthor.username,
          nestedComments,
        };
      }

      return null;
    })
  );

  const extendedComments = unfilteredExtendedComments.reduce<IExtendedComment[]>((acc, comment) => {
    if (comment) {
      acc.push(comment);
    }

    return acc;
  }, []);

  return extendedComments;
}
