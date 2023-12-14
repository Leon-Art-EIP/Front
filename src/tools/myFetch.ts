import { IConnectedUser } from "../interfaces/user/user";

const NEXT_PUBLIC_BACKEND_URL = "http://localhost:5000";

type TMethod = "GET" | "POST" | "PUT" | "DELETE";

interface IMyFetch {
  route: string;
  method: TMethod;
  body?: string;
}

export async function myFetch({ route, method, body }: IMyFetch) {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const auth = user.token ? `Bearer ${user.token}` : "";

  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body,
  });

  if (response.status === 401) {
    localStorage.removeItem("user");
  }
  return response;
}
