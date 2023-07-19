import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout/Layout";
import Wrapper from "./components/Layouts/Wrapper/Wrapper";
import ScrollTopTop from "./hooks/useScroll";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/Layouts/404NotFound/404NotFound";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import useConfigs from "./hooks/useConfigs";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

export default function App() {
  useConfigs();
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
        <ScrollTopTop />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/" element={<HomePage />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/blog" element={<Blog />}/>
            <Route path="/blog/:id" element={<Post />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
