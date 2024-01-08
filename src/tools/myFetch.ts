import { IConnectedUser } from "../interfaces/user/user";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type TMethod = "GET" | "POST" | "PUT" | "DELETE";

interface IMyFetch {
  route: string;
  method: TMethod;
  body?: string | FormData;
  formData?: boolean;
}

export async function myFetch({ route, method, body, formData }: IMyFetch) {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const auth = user.token ? `Bearer ${user.token}` : "";

  const headers: HeadersInit = formData
    ? {
        Authorization: auth,
      }
    : {
        "Content-Type": "application/json",
        Authorization: auth,
      };

  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${route}`, {
    method,
    headers,
    body,
  });

  if (response.status === 401) {
    localStorage.removeItem("user");
  }
  return response;
}
