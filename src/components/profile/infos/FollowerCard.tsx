import { Send } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IConnectedUser } from "../../../interfaces/user/user";
import { myFetch } from "../../../tools/myFetch";

export interface FollowerCardProps {
  id: string;
  name: string;
  index: number;
  // currentUser: IConnectedUser | undefined;
}

/* c8 ignore start */

export function FollowerCard(props: FollowerCardProps): JSX.Element {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<IConnectedUser>();

  function redirectToProfile() {
    console.log(`navigate to profile ${props.id}`);
    router.push(`/profile/${props.id}`);
  }

  async function handleContact() {
    // router.push(`/chat?userId=${props.id}`);
    // router.push(`/chat/${props.id}`);
    const response = await myFetch({
      route: `/api/conversations/create`,
      method: "PUT",
      body: JSON.stringify({
        UserOneId: props.id,
        UserTwoId: currentUser?.user.id,
      }),
    });
    const data = response.json;
    if (response.ok) {
      router.push(`/chat/${data.convId}`);
    }
  }

  useEffect(() => {
    async function getCurrentUser() {
      if (!localStorage.getItem("user")) {
        router.push("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user") || "{}"));
      }
    }
    getCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pl-2 sm:pl-2 flex justify-between items-center w-full">
      <div className="relative flex flex-row items-center w-full p-2 cursor-pointer rounded-l-full hover:bg-secondary">
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
