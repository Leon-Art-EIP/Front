import { atom } from "recoil";
import { IConnectedUser } from "../interfaces/user/user";

export const notLoggedInUserData: IConnectedUser = {
  token: "",
  user: {
    id: "",
    username: "",
    email: "",
    is_artist: false,
    availability: "",
    subscription: "",
    collections: [],
  },
};

let userData = notLoggedInUserData;

// Check if localStorage is available (browser environment)
if (typeof window !== "undefined") {
  const strUser = localStorage.getItem("user");
  if (strUser) {
    userData = JSON.parse(strUser);
  }
}

export const connectedUser = atom({
  key: "connectedUser",
  default: userData,
});
