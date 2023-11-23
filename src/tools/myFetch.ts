import { useSetRecoilState } from "recoil";
import { connectedUser, notLoggedInUserData } from "../recoil/SetupRecoil";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type TMethod = "GET" | "POST" | "PUT" | "DELETE";

interface IMyFetch {
  route: string;
  method: TMethod;
  body?: string;
}

export async function MyFetch({ route, method, body }: IMyFetch) {
  const setConnectedUser = useSetRecoilState(connectedUser);

  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status === 404) {
    setConnectedUser(notLoggedInUserData);
    localStorage.removeItem("user");
  }
  return response;
}
