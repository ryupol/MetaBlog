import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import HomeContent from "../components/home-content";

function Home() {
  return (
    <main className="theme-base">
      <Navbar />
      <Header />
      <h1 className="max-container mb-8 mt-36">Latest Post</h1>
      <HomeContent />
      <Footer />
    </main>
  );
}

export default Home;
