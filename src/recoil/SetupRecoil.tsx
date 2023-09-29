import { atom } from "recoil";

let defaultLoggedIn = false;

// Check if localStorage is available (browser environment)
if (typeof window !== "undefined" && localStorage.getItem("token") !== null) {
  defaultLoggedIn = true;
}

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: defaultLoggedIn,
});
