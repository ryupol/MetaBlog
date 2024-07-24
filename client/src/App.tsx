import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog";
import Signin from "./pages/signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
