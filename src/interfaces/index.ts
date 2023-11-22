export interface ITab {
  name: string;
  href: string;
  loggedIn: boolean;
  hidden?: boolean;
}

export type ISuccess = {
  token: string;
};

export type IError = {
  errors: {
    type: string;
    msg: string;
    path: string;
    location: string;
    value: string;
  }[];
};
