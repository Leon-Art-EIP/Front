export interface ITheme {
  primary: string;
  primaryHover: string;
  primaryPressed: string;
  primaryDisabled: string;
  secondary: string;
  secondaryHover: string;
  secondaryPressed: string;
  secondaryDisabled: string;
  tertiary: string;
  tertiaryHover: string;
  tertiaryPressed: string;
  tertiaryDisabled: string;
  primaryPink: string;
  cardBackground: string;
}

const theme1: ITheme = {
  primary: "#e03915",
  primaryHover: "#e03a15d6",
  primaryPressed: "#e03a15d6",
  primaryDisabled: "#e03a1580",
  secondary: "#eeeeee",
  secondaryHover: "#eeeeeec2",
  secondaryPressed: "#eeeeeec2",
  secondaryDisabled: "#eeeeee8b",
  tertiary: "#2d142c",
  tertiaryHover: "#2d142c",
  tertiaryPressed: "#2d142c",
  tertiaryDisabled: "#2d142c75",
  primaryPink: "#FFB4AD",
  cardBackground: "#F3F3F3",
};

const theme2: ITheme = {
  primary: "#e03915",
  primaryHover: "#e03a15d6",
  primaryPressed: "#e03a15d6",
  primaryDisabled: "#e03a1580",
  secondary: "#eeeeee",
  secondaryHover: "#eeeeeec2",
  secondaryPressed: "#eeeeeec2",
  secondaryDisabled: "#eeeeee8b",
  tertiary: "#2d142c",
  tertiaryHover: "#2d142c",
  tertiaryPressed: "#2d142c",
  tertiaryDisabled: "#2d142c75",
  primaryPink: "#FFB4AD",
  cardBackground: "#F3F3F3",
};

const Themes: Record<string, ITheme> = {
  theme1,
  theme2,
};

export default Themes;
