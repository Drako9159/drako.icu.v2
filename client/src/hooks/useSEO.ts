import { useEffect, useRef } from "react";
import { useThemeStore } from "../store/theme";
export default function useSEO({
  description,
  title,
  link,
  image,
}: {
  description: string;
  title: string;
  link: string;
  image: string;
}) {
  const prevTitle = useRef(document.title);
  const prevDescription = useRef(
    document.querySelector('meta[name="description"]')?.getAttribute("content")
  );
  const prevLink = useRef(document.querySelector('link[rel="canonical"]'));
  const prevOgTitle = useRef(
    document.querySelector('meta[property="og:title"]')?.getAttribute("content")
  );
  const prevOgDescription = useRef(
    document
      .querySelector('meta[property="og:description"]')!
      .getAttribute("content")
  );
  const prevTwitterTitle = useRef(
    document
      .querySelector('meta[name="twitter:title"]')
      ?.getAttribute("content")
  );
  const prevTwitterDescription = useRef(
    document
      .querySelector('meta[name="twitter:description"]')!
      .getAttribute("content")
  );
  const prevThemeColor = useRef(
    document.querySelector('meta[name="theme-color"]')?.getAttribute("content")
  );

  const prevTwitterImage = useRef(
    document
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute("content")
  );
  const prevOgImage = useRef(
    document.querySelector('meta[property="og:image"]')?.getAttribute("content")
  );
  const prevContentImage = useRef(
    document.querySelector('meta[name="image"]')?.getAttribute("content")
  );

  useEffect(() => {
    const previousTitle = prevTitle.current;

    if (title) {
      document.title = `${title}`;
    }
    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  useEffect(() => {
    const previousDescription = prevDescription.current;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      metaDescription?.setAttribute("content", `${description}`);
    }
    return () =>
      metaDescription?.setAttribute("content", `${previousDescription}`);
  }, [description]);

  useEffect(() => {
    const previousLink = prevLink.current;
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (link) {
      linkCanonical?.setAttribute("href", `${link}`);
    }
    return () => linkCanonical?.setAttribute("href", `${previousLink}`);
  }, [link]);

  useEffect(() => {
    const previousOgTitle = prevOgTitle.current;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (title) {
      ogTitle?.setAttribute("content", `${title}`);
    }
    return () => ogTitle?.setAttribute("content", `${previousOgTitle}`);
  }, [title]);

  useEffect(() => {
    const previousOgDescription = prevOgDescription.current;
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (description) {
      ogDescription?.setAttribute("content", `${description}`);
    }
    return () =>
      ogDescription?.setAttribute("content", `${previousOgDescription}`);
  }, [description]);

  useEffect(() => {
    const previousTwitterTitle = prevTwitterTitle.current;
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (title) {
      twitterTitle?.setAttribute("content", `${title}`);
    }
    return () =>
      twitterTitle?.setAttribute("content", `${previousTwitterTitle}`);
  }, [title]);

  useEffect(() => {
    const previousTwitterDescription = prevTwitterDescription.current;
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (description) {
      twitterDescription?.setAttribute("content", `${description}`);
    }
    return () =>
      twitterDescription?.setAttribute(
        "content",
        `${previousTwitterDescription}`
      );
  }, [description]);

  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    const previousThemeColor = prevThemeColor.current;
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (theme === "night") {
      themeColor?.setAttribute("content", "#1f2028");
    } else {
      themeColor?.setAttribute("content", "#ffffff");
    }
    return () => themeColor?.setAttribute("content", `${previousThemeColor}`);
  }, [theme]);

  useEffect(() => {
    const previousTwitterImage = prevTwitterImage.current;
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (image) {
      twitterImage?.setAttribute("content", `${image}`);
    }
    return () =>
      twitterImage?.setAttribute("content", `${previousTwitterImage}`);
  }, [image]);

  useEffect(() => {
    const previousOgImage = prevOgImage.current;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (image) {
      ogImage?.setAttribute("content", `${image}`);
    }
    return () => ogImage?.setAttribute("content", `${previousOgImage}`);
  }, [image]);

  useEffect(() => {
    const previousContentImage = prevContentImage.current;
    const contentImage = document.querySelector('meta[name="image"]');
    if (image) {
      contentImage?.setAttribute("content", `${image}`);
    }
    return () =>
      contentImage?.setAttribute("content", `${previousContentImage}`);
  }, [image]);
}
