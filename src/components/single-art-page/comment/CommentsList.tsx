import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IComment, IDisplayComment } from "../../../interfaces/single/comment";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { myFetch } from "../../../tools/myFetch";
import { imageApi } from "../../../tools/variables";
import Fetcher from "../../fetch/Fetcher";
import { Button, Modal } from "../../lib";
import Comment from "./Comment";

interface ICommentsListProps {
  artPublicationId: string;
  connectedUserId: string;
  localComments: IDisplayComment[];
  setLocalComments: Dispatch<SetStateAction<IDisplayComment[]>>;
  isChild?: boolean;
  parentCommentId: string | undefined;
  nestedComments?: Omit<IComment, "nestedComments">[];
}

export default function CommentsList(props: ICommentsListProps): JSX.Element {
  const [displayComments, setDisplayComments] = useState<IDisplayComment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIdComment, setDeleteIdComment] = useState("");
  const [nbFetchs, setNbFetchs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (props.nestedComments) {
        const authenticatedComments = await Promise.all(
          props.nestedComments.map(async (comment) => {
            const responseAuthor = await myFetch({ route: `/api/user/profile/${comment.userId}`, method: "GET" });

            if (responseAuthor.ok) {
              const author = responseAuthor.json as IProfileUser;
              return {
                id: comment.id,
                profilePicture: `${imageApi}/${author.profilePicture}`,
                username: author.username,
                text: comment.text,
                createdAt: comment.createdAt,
                authorId: comment.userId,
                nestedComments: "nestedComments" in comment ? comment.nestedComments : undefined,
                likes: comment.likes,
              };
            }
          })
        );

        setDisplayComments(
          authenticatedComments.filter((comment): comment is IDisplayComment => comment !== undefined)
        );
      } else {
        const response = await myFetch({
          route: `/api/art-publication/comment/${props.artPublicationId}`,
          method: "GET",
        });

        if (response.ok) {
          const comments = response.json as IComment[];

          const authenticatedComments = await Promise.all(
            comments.map(async (comment) => {
              const responseAuthor = await myFetch({ route: `/api/user/profile/${comment.userId}`, method: "GET" });

              if (responseAuthor.ok) {
                const author = responseAuthor.json as IProfileUser;
                return {
                  id: comment.id,
                  profilePicture: `${imageApi}/${author.profilePicture}`,
                  username: author.username,
                  text: comment.text,
                  createdAt: comment.createdAt,
                  authorId: comment.userId,
                  nestedComments: "nestedComments" in comment ? comment.nestedComments : undefined,
                  likes: comment.likes,
                };
              }
            })
          );

          setDisplayComments(
            authenticatedComments.filter((comment): comment is IDisplayComment => comment !== undefined)
          );
        }
      }
    };
    fetchData();
  }, [props.artPublicationId, props.nestedComments]);

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteIdComment("");
  };

  const openModal = (commentId: string) => {
    setIsModalOpen(true);
    setDeleteIdComment(commentId);
  };

  const deleteComment = () => {
    if (deleteIdComment) {
      setIsModalOpen(false);
      setNbFetchs(nbFetchs + 1);
    }
  };

  const handleOk = () => {
    props.setLocalComments(props.localComments.filter((comment) => comment.id !== deleteIdComment));
    setDisplayComments(displayComments.filter((comment) => comment.id !== deleteIdComment));
    setDeleteIdComment("");
  };

  const comments = [...props.localComments, ...displayComments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <>
      <Fetcher
        method="DELETE"
        nbFetchs={nbFetchs}
        route={`/api/art-publication/comment/${deleteIdComment}`}
        successStr="Commentaire supprimée"
        handleOk={handleOk}
        setIsLoading={setIsLoading}
      />
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?</h1>
          <div className="flex gap-4 items-center justify-center">
            <Button onClick={closeModal} color="secondary" type="button">
              Annuler
            </Button>
            <Button onClick={deleteComment} color="danger" type="button">
              Oui
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-8">
        {comments.map((comment, index) => (
          <Comment
            key={`${props.isChild ? "child-" : ""}${index}-${comment.id}`}
            comment={comment}
            connectedUserId={props.connectedUserId}
            isLoading={isLoading}
            openModal={openModal}
            isChild={props.isChild}
            parentCommentId={props.parentCommentId ?? undefined}
            artPublicationId={props.artPublicationId}
            localComments={props.localComments}
            setLocalComments={props.setLocalComments}
          />
        ))}
      </div>
    </>
  );
}
