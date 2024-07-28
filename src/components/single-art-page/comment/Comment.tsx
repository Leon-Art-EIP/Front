import { IDisplayComment } from "../../../interfaces/single/comment";
import IconButton from "../artwork/IconButton";
import { stringToFrenchDate } from "../../../tools/date";
import { Delete } from "@mui/icons-material";
import Link from "next/link";

interface ICommentProps {
  comment: IDisplayComment;
  connectedUserId: string;
  isLoading: boolean;
  openModal: (id: string) => void;
}

export default function Comment(props: ICommentProps): JSX.Element {
  return (
    <div className="flex gap-4 items-center text-tertiary">
      <Link href={`/profile/${props.comment.authorId}`}>
        <img src={props.comment.profilePicture} alt="profile" className="rounded-3xl w-11 h-11" />
      </Link>
      <div>
        <div className="flex gap-2">
          <p className="font-semibold">{props.comment.username}</p>
          <p className="text-neutral-400">{stringToFrenchDate(props.comment.createdAt)}</p>
        </div>
        <p>{props.comment.text}</p>
      </div>
      {props.comment.authorId === props.connectedUserId && (
        <IconButton
          icon={Delete}
          backgroundColor="transparent"
          iconColor="red"
          onClick={() => {
            props.openModal(props.comment.id);
          }}
          className="border hover:border-neutral-400"
          disabled={props.isLoading}
        />
      )}
    </div>
  );
}
