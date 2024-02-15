import { IError, IUnauthorized } from "../interfaces";
import { TMethod } from "../interfaces/fetch/methods";
import { IConnectedUser } from "../interfaces/user/user";

export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IFetchData {
  route: string;
  method: TMethod;
  body?: string | FormData;
  successStr?: string;
  handleUnauthorized?: () => void;
}

export interface IMyFetchResponse {
  ok: boolean;
  message?: string;
  json: any;
}

/* c8 ignore start */

export async function myFetch(props: IFetchData): Promise<IMyFetchResponse> {
  let json;
  let response;
  let message = props.successStr;
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const auth = user.token ? `Bearer ${user.token}` : "";

  const headers: HeadersInit =
    props.body instanceof FormData
      ? {
          Authorization: auth,
        }
      : {
          "Content-Type": "application/json",
          Authorization: auth,
        };

  try {
    response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${props.route}`, {
      method: props.method,
      headers,
      body: props.body,
    });

    if (response.status === 401) {
      localStorage.removeItem("user");
      if (props.handleUnauthorized) {
        props.handleUnauthorized();
      }
      const error: IUnauthorized = await response.json();
      message = error.msg;
    } else if (response.status === 422) {
      const error: IError = await response.json();
      console.log(error);
      message = error.errors.length > 0 ? error.errors[0].msg : "Something wrong happened";
    } else if (response.status === 404) {
      message = "404 Not Found";
    } else if (response.status === 500) {
      message = "500 Internal Server Error";
    } else if (!response.ok) {
      message = "Something wrong happened";
    } else {
      json = await response.json();
    }
  } catch (error) {
    message = "The server is not responding";
    console.error(error);
  }

  return {
    ok: response ? response.ok : false,
    message,
    json,
  };
}

/* c8 ignore stop */
