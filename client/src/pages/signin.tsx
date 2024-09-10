import SigninForm from "../components/signin-form";
import Logo from "../components/ui/logo";

function Signin() {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="theme-base flex items-center justify-center md:h-screen">
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
