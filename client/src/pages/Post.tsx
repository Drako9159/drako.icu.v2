import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Header from "../components/Layouts/Header/Header";
import NotRequest from "../components/Layouts/400BadRequest/400BadRequest";
import Footer from "../components/Layouts/Footer/Footer";
import useSEO from "../hooks/useSEO";
import PostHead from "../components/Post/PostHead";
import PostMain from "../components/Post/PostMain";
import { getOnePost } from "../api/post";

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
  const routeParams = useParams();
  const [post, setPost] = useState<PostContent>(initialPostContent);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [postHead, setPostHead] = useState<PostHead>(initialSeo);
  const [colorPost, setColorPost] = useState("blue");

  useSEO({
    description: postHead.description,
    title: postHead.title,
    link: postHead.link,
    image: postHead.image,
  });

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    try {
      const response = await getOnePost(`${routeParams.id}`);
      setPost(response.data.post);
      setColorPost(response.data.post.color)
      
      setIsLoading(false);
      setStatus(200);
      setPostHead({
        description: response.data.post.description,
        title: response.data.post.title,
        link: import.meta.env.VITE_URL_DOMAIN + "blog/" + response.data.post.id,
        image: response.data.post.image
      })  
    } catch (error: any) {
      setStatus(error.request.status);
      setIsLoading(false);
    }
  }

  return status >= 400 ? (
    <>
      <Header activeLink={"blog"} />
      <PostHead />
      <NotRequest status={status} />
      <Footer />
    </>
  ) : (
    <>
      <Header activeLink={"blog"} />
      <PostHead />
      <PostMain
        post={post}
        status={status}
        isLoading={isLoading}
        colorPost={colorPost}
      />
      <Footer />
    </>
  );
}
