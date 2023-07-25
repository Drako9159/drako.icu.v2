import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layouts/Header/Header";
import NotRequest from "../components/Layouts/400BadRequest/400BadRequest";
import Footer from "../components/Layouts/Footer/Footer";
import useSEO from "../hooks/useSEO";
import PostHead from "../components/Post/PostHead";
import PostMain from "../components/Post/PostMain";
import { getOnePost } from "../api/post";
import ChargeAnimation from "../components/Layouts/ChargeAnimation/ChargeAnimation";
import { useLoadingStore } from "../store/loading";
import useAuthWebsite from "../hooks/useAuthWebsite";
import { useAuthStore } from "../store/auth";

export interface PostContent {
  id: string;
  title: string;
  category: string;
  tag: string;
  language: string;
  color: string;
  image: string;
  description: string;
  read_time: string;
  author: string;
  date: string;
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
  content: string;
}

const initialPostContent: PostContent = {
  id: "",
  title: "",
  category: "",
  tag: "",
  language: "",
  color: "",
  image: "",
  description: "",
  read_time: "",
  author: "",
  date: "",
  is_public: false,
  createdAt: "",
  updatedAt: "",
  content: "",
};

interface PostHead {
  description: string;
  title: string;
  link: string;
  image: string;
}
const initialSeo: PostHead = {
  description: "",
  title: "",
  link: "",
  image: "",
};
export default function Post() {
  useAuthWebsite();
  const isAuth = useAuthStore((state) => state.isAuth);
  
  const routeParams = useParams();
  const [post, setPost] = useState<PostContent>(initialPostContent);
  const [status, setStatus] = useState(0);
  const [postHead, setPostHead] = useState<PostHead>(initialSeo);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useSEO({
    description: postHead.description,
    title: postHead.title,
    link: postHead.link,
    image: postHead.image,
  });

  useEffect(() => {
    if (isAuth) getPost();
  }, [isAuth]);

  async function getPost() {
    try {
      setIsLoading(true);
      const response = await getOnePost(`${routeParams.id}`);
      setStatus(response.status);
      setPost(response.data.post);
      setIsLoading(false);
      setPostHead({
        description: response.data.post.description,
        title: response.data.post.title,
        link:
          import.meta.env.VITE_URL_DOMAIN + "blog/" + response.data.post.slug,
        image: response.data.post.image,
      });
    } catch (error: any) {
      setStatus(error.request.status);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header activeLink={"blog"} />
      <PostHead />
      <ChargeAnimation />
      {status >= 400 && <NotRequest status={status} />}
      {post.id !== "" && <PostMain post={post} />}
      <Footer />
    </>
  );
}
