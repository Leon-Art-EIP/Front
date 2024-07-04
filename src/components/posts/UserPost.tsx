"use client";

import { ArrowRight } from "@mui/icons-material";
import { IPost } from "../../interfaces/posts";
import { stringToFrenchDate } from "../../tools/date";
import { NEXT_PUBLIC_BACKEND_URL } from "../../tools/myFetch";
import Link from "../link/Link";
import PostText from "./PostText";
import LikePost from "./LikePost";

interface IUserPostProps {
  post: IPost;
  connectedUserId: string | undefined;
  onLike: (postId: string, isLiked: boolean) => void;
}

export default function UserPost(props: IUserPostProps): JSX.Element {
  return (
    <div className="p-2 flex flex-col gap-2 max-w-3xl">
      <div className="flex gap-2 items-center">
        <img
          src={`${NEXT_PUBLIC_BACKEND_URL}/api/${props.post.userId.profilePicture}`}
          alt="post-profilePicture"
          className="w-8 h-8 object-cover"
        />
        <h3 className="text-primary">{props.post.userId.username}</h3>
        <p className="text-neutral-500 italic">le {stringToFrenchDate(props.post.createdAt)}</p>
      </div>
      <PostText text={props.post.text} />
      <div className="flex gap-2">
        <h3 className="text-sm italic text-neutral-500">
          {props.post.likes.length > 0 ? (
            <>
              <span className="text-primary">{props.post.likes.length}</span>{" "}
              {props.post.likes.length > 1 ? "peronnes ont aimé ce post" : "personne a aimé ce post"}
            </>
          ) : (
            "Soyez la première personne à aimer ce post"
          )}
        </h3>
        <LikePost
          connectedUserId={props.connectedUserId}
          likes={props.post.likes}
          postId={props.post._id}
          onLike={props.onLike}
        />
      </div>
      {props.post.artPublicationId && (
        <Link
          href={`/single/${props.post.artPublicationId._id}`}
          className="py-2 px-4 rounded bg-primary text-white flex justify-between hover:bg-primary-hover"
        >
          {props.post.artPublicationId.name}
          <ArrowRight />
        </Link>
      )}
    </div>
  );
}
