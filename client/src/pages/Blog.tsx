import useSEO from "../hooks/useSEO";
import useLanguage from "../hooks/useLanguage";
import { useConfigsStore } from "../store/configs";
import Header from "../components/Layouts/Header/Header";
import Footer from "../components/Layouts/Footer/Footer";
import { useEffect } from "react";
import { usePostStore } from "../store/posts";
import { getPostsListByLanguage } from "../api/post";
import BlogHead from "../components/Blog/BlogHead";
import BlogMain from "../components/Blog/BlogMain";
import ChargeAnimation from "../components/Layouts/ChargeAnimation/ChargeAnimation";
import BadRequest from "../components/Layouts/400BadRequest/400BadRequest";
import { useLoadingStore } from "../store/loading";
import useAuthWebsite from "../hooks/useAuthWebsite";
import { useAuthStore } from "../store/auth";
export default function Blog() {
  
  const isAuth = useAuthStore((state) => state.isAuth);
  useAuthWebsite();
  useSEO(useLanguage().head.blog);

  const language = useConfigsStore((state) => state.configs.language);
  const setPosts = usePostStore((state) => state.setPosts);
  const setStatus = usePostStore((state) => state.setStatus);
  const status = usePostStore((state) => state.status);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    if (isAuth) getPosts();
  }, [isAuth]);

  async function getPosts() {
    try {
      setIsLoading(true);
      const response = await getPostsListByLanguage(language);
      setPosts(response.data.posts);
      setIsLoading(false);
      setStatus(response.status);
    } catch (error) {
      setStatus(404);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header activeLink={"blog"} />
      <BlogHead />
      <ChargeAnimation />
      {status >= 400 && <BadRequest status={status} />}
      {/* {isLoading ? <ChargeAnimation /> : <BlogMain />} */}
      {status === 200 && <BlogMain />}
      <Footer />
    </>
  );
}
