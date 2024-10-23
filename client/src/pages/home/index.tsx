import HomeContent from "./home-content";
import Header from "./header";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import useQueryValue from "../../hooks/useQueryValue";

function Home() {
  const queryValue = useQueryValue("search_query") || "";

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
