import Gallery from "../../components/gallery";
import TextLogo from "../../components/text-logo/TextLogo";
import LoginForm from "../../forms/tsx/LoginForm";

export default function Page(): JSX.Element {
  return (
    <div className="bg-background flex h-screen">
      <div className="bg-background-hl shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <TextLogo />
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="text-tertiary xl:text-[43px] text-4xl xl:font-extrabold font-semibold w-full xl:text-center text-start">
            Se connecter
          </label>
          <LoginForm />
          <label className="text-tertiary flex flex-col justify-center items-center font-normal pt-2">
            Vous n{"'"}avez pas de compte ?
            <a className="ms-1 font-extrabold text-primary cursor-pointer" title="register" href="/register">
              S{"'"}enregistrer
            </a>
          </label>
          <div className="flex justify-center w-full pt-2">
            <div className="h-1 w-5/6 bg-tertiary rounded-full"></div>
          </div>
          <label className="flex flex-col justify-center items-center font-normal pt-2">
            <a
              className="ms-1 font-extrabold text-primary cursor-pointer"
              title="forgotten_password"
              href="/forgotten_password"
            >
              Mot de passe oublié ?
            </a>
          </label>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/register"} redirectText={"S'enregistrer"}></Gallery>
      </div>
    </div>
  );
}
