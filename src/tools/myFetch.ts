import { IError, IUnauthorized } from "../interfaces";
import { TMethod } from "../interfaces/fetch/methods";
import { IConnectedUser } from "../interfaces/user/user";
import { TErrorMessages, errors } from "./variables";

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

  const resetCredentials = () => {
    localStorage.removeItem("user");
    if (props.handleUnauthorized) {
      props.handleUnauthorized();
    }
  };

  try {
    response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${props.route}`, {
      method: props.method,
      headers,
      body: props.body,
    });

    if (response.status === 401) {
      resetCredentials();
      const error: IUnauthorized = await response.json();
      const serverErrorMsg = errors[error.msg as TErrorMessages];
      message = error.msg ? serverErrorMsg ?? error.msg : "Vous n'êtes pas autorisé à effectuer cette action";
    } else if (response.status === 422) {
      const error: IError = await response.json();
      const serverErrorMsg = (error.errors.length > 0 ? error.errors[0].msg : undefined) as TErrorMessages | undefined;
      message = serverErrorMsg ? errors[serverErrorMsg] ?? serverErrorMsg : "Une erreur est survenue";
    } else if (response.status === 404) {
      message = "404 Ressource non disponible";
    } else if (response.status === 500) {
      message = "Cette requête est actuellement indisponible";
    } else if (!response.ok) {
      message = "Une erreur est survenue";
    } else {
      json = await response.json();
    }
  } catch (error) {
    message = "Le serveur ne répond pas, veuillez réessayer plus tard";
    resetCredentials();
  }

  return {
    ok: response ? response.ok : false,
    message,
    json,
  };
}

/* c8 ignore stop */
