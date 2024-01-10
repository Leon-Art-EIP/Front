import { useRouter } from "next/navigation";
import { IUsers } from "../../interfaces/explorer/users";

interface UsersSliderProps {
  users: IUsers;
}

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function UsersSlider(props: UsersSliderProps): JSX.Element {
  const router = useRouter();

  function handleClickOnUser(index: number) {
    router.push(`/profile/${props.users.users[index]._id}`);
  }

  return (
    <div className="flex flex-row gap-8 justify-start overflow-x-auto pb-3">
      {props.users.users.map((user, index) => (
        <div
          key={index}
          className="flex flex-col cursor-pointer rounded-xl hover:opacity-75 transition-opacity hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out px-4 py-2"
          onClick={() => handleClickOnUser(index)}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${NEXT_PUBLIC_BACKEND_URL}/api/${user.profilePicture}`} alt="art" className="object-cover" />
          </div>
          <span className="text-xl font-semibold text-center">{user.username}</span>
        </div>
      ))}
    </div>
  );
}
