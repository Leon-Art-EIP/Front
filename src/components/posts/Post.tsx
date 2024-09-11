"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPost } from "../../interfaces/posts";
import { imageApi } from "../../tools/variables";
import { stringToFrenchDate } from "../../tools/date";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { myFetch } from "../../tools/myFetch";
import { CircularProgress } from "@mui/material";
import PostArtPublication from "./PostArtPublication";
import { DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import DeletePostModal from "./DeletePostModal";
import Link from "next/link";

interface IPostProps {
  post: IPost;
  connectedUserId: string;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  isDeleteLoading: boolean;
}

async function fetchArtPublicationPicture(
  artPublicationId: string,
  setArtPublication: Dispatch<SetStateAction<IArtPublication | null | undefined>>
) {
  const response = await myFetch({
    route: `/api/art-publication/${artPublicationId}`,
    method: "GET",
  });

  if (response.ok) {
    const data = response.json as IArtPublication;

    setArtPublication(data);
  } else {
    setArtPublication(undefined);
  }
}

export default function Post(props: IPostProps): JSX.Element {
  const [artPublication, setArtPublication] = useState<IArtPublication | null | undefined>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isLiked = props.post.likes.includes(props.connectedUserId);

  useEffect(() => {
    if (props.post.artPublicationId) {
      fetchArtPublicationPicture(props.post.artPublicationId, setArtPublication);
    }
  }, [props.post]);

  const onLike = () => {
    props.onLike(props.post.id);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    props.onDelete(props.post.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {isDeleteModalOpen && <DeletePostModal handleClose={closeDeleteModal} handleDelete={handleDelete} />}
      <div className="flex flex-col gap-4 bg-secondary p-4 rounded-2xl w-1/2">
        <div className="flex gap-4 items-center justify-between">
          <Link href={`/profile/${props.post.userId}`} className="flex gap-4 items-center">
            <img alt="author" src={`${imageApi}/${props.post.user.profilePicture}`} className="w-8 h-8 rounded-full" />
            <p className="font-semibold flex">{props.post.user.username}</p>
          </Link>
          <p className="text-xs font-light">{stringToFrenchDate(props.post.createdAt)}</p>
        </div>
        <p className="font-light">{props.post.text}</p>
        {props.post.artPublicationId &&
          (artPublication === null ? (
            <CircularProgress size={20} thickness={4} color="primary" />
          ) : (
            <PostArtPublication
              artPublication={{
                _id: props.post.artPublicationId,
                image: artPublication?.image,
              }}
            />
          ))}
        <div className="flex justify-between">
          <button type="button" className="flex items-center gap-1.5" onClick={onLike}>
            {isLiked ? <Favorite /> : <FavoriteBorder />} {props.post.likes.length}
          </button>
          {props.connectedUserId === props.post.userId && (
            <button type="button" onClick={openDeleteModal} disabled={props.isDeleteLoading}>
              {props.isDeleteLoading ? <CircularProgress size={20} thickness={4} /> : <DeleteOutline />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
