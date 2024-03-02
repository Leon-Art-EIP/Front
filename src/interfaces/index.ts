export interface ITab {
  name: string;
  href: string;
  loggedIn: boolean;
  navbar: boolean;
  verticalNavbar: boolean;
  header: boolean;
}

export interface IError {
  errors: {
    msg: string;
  }[];
};

export interface IUnauthorized {
  msg: string;
}

export interface IOption<T extends string | number> {
  value: T;
  label: string;
}
