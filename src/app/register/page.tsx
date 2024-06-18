import Gallery from "../../components/gallery";
import RegisterForm from "../../forms/tsx/RegisterForm";

export default function Page(): JSX.Element {
  return (
    <div className="flex h-screen">
      <div className="shadow-[10px_0_13px_-7px_rgba(170,170,170)] h-screen xl:w-1/3 w-full flex flex-col items-center justify-center fixed">
        <label className="xl:hidden block text-6xl font-bold">
          <span className="text-[#E11C0A] cursor-default">Leon</span>
          <span className="text-[#000000] cursor-default">&apos;Art</span>
        </label>
        <div className="max-w-xs w-full pt-28 xl:pt-0">
          <label className="xl:text-5xl text-4xl xl:font-extrabold xl:leading-relaxed font-semibold w-full xl:text-center text-start">
            S&apos;enregistrer
          </label>
          <RegisterForm />
          <label className="flex justify-center text-tertiary text-sm font-normal pt-5">
            <span className="whitespace-nowrap">
              Vous avez déjà un compte ?
              <a
                className="ms-1 font-extrabold text-primary cursor-pointer hover:underline"
                title="login"
                href="/login"
              >
                Se connecter
              </a>
            </span>
          </label>
        </div>
      </div>
      <div className="xl:block hidden ml-[33.33%] w-2/3 p-4">
        <Gallery redirectUrl={"/login"} redirectText={"Se connecter"}></Gallery>
      </div>
    </div>
  );
}
