import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog";
import BlogCreate from "./pages/blog-create";
import EditBlog from "./pages/blog-update";
import Signin from "./pages/signin";
import NotFound from "./pages/notfound";
import Signup from "./pages/signup";
import EditProfile from "./pages/profile-update";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/blog/create" element={<BlogCreate />} />
      <Route path="/blog/update/:id" element={<EditBlog />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/update" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
