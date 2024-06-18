import Gallery from "../../components/gallery";
import TextLogo from "../../components/text-logo/TextLogo";
import LoginForm from "../../forms/tsx/LoginForm";

export default function Page(): JSX.Element {
  return (
    <div className="bg-background flex h-screen">
      <div className="bg-background shadow-[10px_0_10px_-10px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <TextLogo />
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="text-tertiary xl:text-[43px] text-4xl xl:font-extrabold font-semibold w-full xl:text-center text-start">
            Se connecter
          </label>
          <LoginForm />
          <label className="flex justify-center text-tertiary text-sm font-normal pt-5">
            <span className="whitespace-nowrap">
              Vous n{"'"}avez pas de compte ?
              <a
                className="ms-1 font-extrabold text-primary cursor-pointer hover:underline"
                title="register"
                href="/register"
              >
                S{"'"}enregistrer
              </a>
            </span>
          </label>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/register"} redirectText={"S'enregistrer"}></Gallery>
      </div>
    </div>
  );
}
