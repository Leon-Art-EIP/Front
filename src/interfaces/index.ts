export interface ITab {
  name: string;
  href: string;
  loggedIn: boolean;
  navbar: boolean;
  verticalNavbar: boolean;
  header: boolean;
}

export type IError = {
  errors: {
    type: string;
    msg: string;
    path: string;
    location: string;
    value: string;
  }[];
};
