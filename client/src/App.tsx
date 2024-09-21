import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog";
import BlogCreate from "./pages/blog-create";
import Signin from "./pages/signin";
import NotFound from "./pages/notfound";
import Signup from "./pages/signup";
import EditProfile from "./pages/edit-profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/create" element={<BlogCreate />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit/profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
