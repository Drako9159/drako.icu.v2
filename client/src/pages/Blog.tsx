import useSEO from "../hooks/useSEO";
import useLanguage from "../hooks/useLanguage";
import NotFound from "../components/Layouts/404NotFound/404NotFound";
import { useConfigsStore } from "../store/configs";
import Header from "../components/Layouts/Header/Header";
import Footer from "../components/Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { usePostStore } from "../store/posts";
import { getPostsList, getPostsListByLanguage } from "../api/post";
import BlogHead from "../components/Blog/BlogHead";
import BlogMain from "../components/Blog/BlogMain";
import NotRequest from "../components/Layouts/400BadRequest/400BadRequest";

export default function Blog() {
  useSEO(useLanguage().head.blog);

  const isAuth = useAuthStore((state) => state.isAuth);
  const language = useConfigsStore((state) => state.configs.language);
  const setPosts = usePostStore((state) => state.setPosts);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = await getPostsListByLanguage(language);
      setPosts(response.data.posts);
      setStatus(response.status);
      setIsLoading(false);
    } catch (error) {
      setStatus(400);
      setIsLoading(false);
    }
  }

  return status >= 400 ? (
    <>
      <Header activeLink={"blog"} />
      <BlogHead />
      <NotRequest status={status}/>
      <Footer />
    </>
  ) : (
    <>
      <Header activeLink={"blog"} />
      <BlogHead />
      <BlogMain isLoading={isLoading} />
      <Footer />
    </>
  );
}
