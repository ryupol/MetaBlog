function NotFound() {
  return (
    <main className="theme-base flex h-[100vh] flex-col justify-center gap-3 text-base">
      <div className="mx-auto">
        <img
          src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
          alt="Monkey"
        />
      </div>
      <p className="text-center">
        This page isn't available. Sorry about that.
      </p>
    </main>
  );
}

export default NotFound;
