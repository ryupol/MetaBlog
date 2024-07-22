import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
