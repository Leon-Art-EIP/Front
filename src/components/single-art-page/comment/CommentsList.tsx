import { Delete } from "@mui/icons-material";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IComment, IDisplayComment } from "../../../interfaces/single/comment";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { stringToFrenchDate } from "../../../tools/date";
import { myFetch } from "../../../tools/myFetch";
import { imageApi } from "../../../tools/variables";
import Fetcher from "../../fetch/Fetcher";
import { Button, Modal } from "../../lib";
import IconButton from "../artwork/IconButton";

interface ICommentsListProps {
  id: string;
  connectedUserId: string;
  localComments: IDisplayComment[];
  setLocalComments: Dispatch<SetStateAction<IDisplayComment[]>>;
}

export default function CommentsList(props: ICommentsListProps): JSX.Element {
  const [displayComments, setDisplayComments] = useState<IDisplayComment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIdComment, setDeleteIdComment] = useState("");
  const [nbFetchs, setNbFetchs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await myFetch({ route: `/api/art-publication/comment/${props.id}`, method: "GET" });

      if (response.ok) {
        const comments = response.json as IComment[];

        const authenticatedComments = await Promise.all(
          comments.map(async (comment) => {
            const responseAuthor = await myFetch({ route: `/api/user/profile/${comment.userId}`, method: "GET" });

            if (responseAuthor.ok) {
              const author = responseAuthor.json as IProfileUser;
              return {
                id: comment._id,
                profilePicture: `${imageApi}/${author.profilePicture}`,
                username: author.username,
                text: comment.text,
                createdAt: comment.createdAt,
                authorId: comment.userId,
              };
            }
          })
        );

        setDisplayComments(
          authenticatedComments.filter((comment): comment is IDisplayComment => comment !== undefined)
        );
      }
    };
    fetchData();
  }, [props.id]);

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
      <div className="flex flex-col gap-4">
        {[...props.localComments, ...displayComments].map((comment, index) => (
          <div key={`${index}-${comment.username}`} className="flex gap-4 items-center text-tertiary">
            <Link href={`/profile/${comment.authorId}`}>
              <img
                src={comment.profilePicture}
                alt="profile"
                width={44}
                height={44}
                className="rounded-3xl w-11 h-11"
              />
            </Link>
            <div>
              <div className="flex gap-2">
                <p className="font-semibold">{comment.username}</p>
                <p className="text-neutral-400">{stringToFrenchDate(comment.createdAt)}</p>
              </div>
              <p>{comment.text}</p>
            </div>
            {comment.authorId === props.connectedUserId && (
              <IconButton
                icon={Delete}
                backgroundColor="transparent"
                color="red"
                onClick={() => {
                  openModal(comment.id);
                }}
                className="border hover:border-neutral-400"
                disabled={isLoading}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
