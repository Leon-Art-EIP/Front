import { IComment, IExtendedComment, TChildExtendedComment } from "../../../interfaces/single/comment";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { myFetch } from "../../../tools/myFetch";
import { imageApi } from "../../../tools/variables";

async function getChildExtendedComments(comment: IComment): Promise<TChildExtendedComment[]> {
  const extendedComments: (TChildExtendedComment | null)[] = await Promise.all(
    comment.nestedComments.map(async (nestedComment) => {
      const response = await myFetch({ route: `/api/user/profile/${nestedComment.userId}`, method: "GET" });

      let replyingToUsername: string | null | undefined = undefined; // null = error

      if (nestedComment.replyingToUserId) {
        const responseReplyingTo = await myFetch({
          route: `/api/user/profile/${nestedComment.replyingToUserId}`,
          method: "GET",
        });

        if (responseReplyingTo.ok) {
          const replyingTo = responseReplyingTo.json as IProfileUser;
          replyingToUsername = replyingTo.username;
        } else {
          replyingToUsername = null;
        }
      }

      if (response.ok && replyingToUsername !== null) {
        const commentAuthor = response.json as IProfileUser;

        return {
          ...nestedComment,
          profilePicture: `${imageApi}/${commentAuthor.profilePicture}`,
          username: commentAuthor.username,
          replyingToUsername: replyingToUsername ?? null,
        };
      }

      return null;
    })
  );

  return extendedComments.filter((comment): comment is TChildExtendedComment => comment !== null);
}

export async function getExtendedComments(artPublicationComments: IComment[]): Promise<IExtendedComment[]> {
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
          replyingToUsername: null,
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
