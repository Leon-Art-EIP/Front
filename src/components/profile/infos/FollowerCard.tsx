import { Send } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export interface FollowerCardProps {
  id: string;
  name: string;
  index: number;
  // currentUser: IConnectedUser | undefined;
}

/* c8 ignore start */

export function FollowerCard(props: FollowerCardProps): JSX.Element {
  const router = useRouter();

  function redirectToProfile() {
    console.log(`navigate to profile ${props.id}`);
    router.push(`/profile/${props.id}`);
  }

  function handleContact() {
    // Ajoutez votre logique pour gérer le contact ici
    console.log(`Contacter ${props.id}`);
    router.push(`/chat?userId=${props.id}`);
  }

  return (
    <div className="pl-6 sm:pl-10">
      <div
        className={`relative flex flex-row items-center justify-between flex-grow-0 w-full p-2 cursor-pointer rounded-l-full hover:bg-secondary`}
      >
        <div className="flex flex-col justify-center flex-grow ml-4 text-tertiary">
          <span className="text-2xl tracking-wide truncate w-4/5" onClick={redirectToProfile}>
            {props.name}
          </span>
        </div>
        <button className="bg-primary text-secondary px-2 py-1 rounded-full" onClick={handleContact}>
          <Send className="ml-1" style={{ marginTop: "-3px" }} />
        </button>
      </div>
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
