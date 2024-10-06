import Button from "../components/ui/button";
import Logo from "../components/ui/logo";

function Forbidden() {
  return (
    <main className="theme-base flex h-full w-full flex-col items-center justify-center">
      <section className="flex w-[400px] flex-col items-center gap-6 rounded-xl bg-theme-fbg p-10">
        <Logo />
        <div className="text-[64px] font-bold text-red-400/80">403</div>
        <h1>Access Forbidden</h1>
        <p className="text-center">
          You don't have permission to access this page.
        </p>
        <a href="/">
          <Button>Go to Homepage</Button>
        </a>
      </section>
    </main>
  );
}

export default Forbidden;
