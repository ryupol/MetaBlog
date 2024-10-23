import Logo from "../../components/logo";
import SignupForm from "./form";

function Signup() {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="theme-base flex min-h-screen items-center justify-center">
      <div className="relative mx-auto my-2 flex w-full max-w-[400px] flex-col space-y-2.5 rounded-xl bg-theme-fbg p-3 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <div className="w-32 md:w-36">
            <Logo signForm={true} />
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}

export default Signup;
