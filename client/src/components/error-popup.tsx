import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

function ErrorPopup({ message }: { message?: string }) {
  if (!message) message = "An unknown error occurred.";
  return (
    <main className="theme-base fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-center p-20">
      <section className="flex w-[420px] flex-col items-center gap-6 rounded-xl bg-theme-fbg p-10">
        <ExclamationTriangleIcon className="m-10 text-red-500" />
        <h1 className="text-center">Oops! Something Went Wrong</h1>
        <p className="text-center">There was an error: {message}</p>
        <a href="/" className="text-primary underline hover:text-primary/70">
          Refresh the page
        </a>
      </section>
    </main>
  );
}

export default ErrorPopup;
