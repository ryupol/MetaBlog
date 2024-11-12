import SigninForm from "./form";
import Logo from "../../components/logo";

function Signin() {
  return (
    <main className="theme-base flex min-h-screen items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 rounded-xl bg-theme-fbg p-3 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo signForm={true} />
          </div>
        </div>
        <SigninForm />
      </div>
    </main>
  );
}

export default Signin;
