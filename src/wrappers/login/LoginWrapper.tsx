import Gallery from "../../components/gallery";
import TextLogo from "../../components/text-logo/TextLogo";
import LoginForm from "../../forms/tsx/LoginForm";

export default function LoginWrapper() {
  return (
    <div className="flex h-screen">
      <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <TextLogo />
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-[43px] text-4xl xl:font-extrabold font-semibold w-full xl:text-center text-start">
            Se connecter
          </label>
          <LoginForm />
          <label className="flex justify-center font-normal">
            Vous n&apos;avez pas de compte ?{" "}
            <a className="ms-1 font-extrabold text-[#E11C0A] cursor-pointer" title="register" href="/register">
              S&apos;enregistrer
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
