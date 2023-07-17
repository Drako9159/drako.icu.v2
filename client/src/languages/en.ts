import { LanguageStructure } from "./language.types";

export const en: LanguageStructure = {
  about: {
    text1: "Hi, I'm Antonio Jaramillo, professional software developer.",
    text2:
      "Focused on offering the best user experience with quality software.",
  },
  blog: {
    text1: "Generating experience with articles.",
    text2: "Find the latest of my writing here.",
  },
  footer: {
    rights: "All rights reserved © Antonio J. 2023",
    name: "Antonio Jaramillo",
    legend: "Full-time software developer",
  },
  header: {
    home: "Antonio.jar",
    nav: ["Blog", "Courses", "Discord", "Chats", "Calls", "Workshops", "About"],
  },
  home: {
    text: "Helping people make the world a better place through quality software.",
    button1: "Read the blog",
    button2: "More",
    button3: "Learn more about Antoio.jar",
  },
  posts: {
    text1: "Back to overview",
  },
  head: {
    home: {
      description:
        "Come take a look at Antonio.jar Take a look at his career as a software engineer.",
      title: "Antonio.jar",
      link: import.meta.env.VITE_URL_DOMAIN,
      image: "/icons/logoMoon.png"
    },
    about: {
      description: "Get to know Antonio.jar",
      title: "About Antonio.jar",
      link: import.meta.env.VITE_URL_DOMAIN + "about",
      image: "/icons/logoMoon.png"
    },
    blog: {
      description: "Come read my blog and learn more about me.",
      title: "The Antonio.jar Blog",
      link: import.meta.env.VITE_URL_DOMAIN + "blog",
      image: "/icons/logoMoon.png"
    },
  },
};
