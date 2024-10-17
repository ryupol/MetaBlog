import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import HomeContent from "../components/home-content";
import getQueryValue from "../utils/getQueryValue";

function Home() {
  const queryValue = getQueryValue("search_query") || "";

  return (
    <main className="theme-base">
      <Navbar />
      <Header queryValue={queryValue || ""} />
      <h1 className={`max-container mb-8 ${queryValue ? "mt-12" : "mt-36"}`}>
        {queryValue ? "Search Result" : "Latest Post"}
      </h1>
      <HomeContent queryValue={queryValue || ""} />
      <Footer />
    </main>
  );
}

export default Home;
