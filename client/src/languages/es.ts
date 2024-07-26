import { LanguageStructure } from "./language.types";
export const es: LanguageStructure = {
  about: {
    text1:
      "Hola, soy Antonio Jaramillo, desarrollador de software profesional.",
    text2:
      "Enfocado en ofrecer la mejor experiencia de usuario con software de calidad.",
  },
  blog: {
    text1: "Generando experiencias con artículos.",
    text2: "Encuentra lo último que he escrito aquí.",
  },
  footer: {
    rights: "Derechos reservados © Antonio J. 2024",
    name: "Antonio Jaramillo",
    legend: "Desarrollador de software a tiempo completo",
  },
  header: {
    home: "Antonio.jar",
    nav: [
      "Blog",
      "Cursos",
      "Discord",
      "Chats",
      "Citas",
      "Trabajos",
      "Acerca de",
    ],
  },
  home: {
    text: "Ayudar a las personas a hacer del mundo un lugar mejor mediante software de calidad.",
    button1: "Lee el blog",
    button2: "Más",
    button3: "Leer más acerca de Antonio.jar",
  },
  posts: {
    text1: "Volver atrás",
  },
  head: {
    home: {
      description:
        "Ven a echar un vistazo a Antonio.jar conoce su carrera como ingeniero de software.",
      title: "Antonio.jar",
      link: import.meta.env.VITE_URL_DOMAIN,
      image: "/icons/logoMoon.png"
    },
    about: {
      description: "Conoce más sobre Antonio.jar",
      title: "Acerca de Antonio.jar",
      link: import.meta.env.VITE_URL_DOMAIN + "about",
      image: "/icons/logoMoon.png"
    },
    blog: {
      description: "Ven a leer mi blog y conoce más sobre Antonio.jar.",
      title: "El Blog de Antonio.jar",
      link: import.meta.env.VITE_URL_DOMAIN + "blog",
      image: "/icons/logoMoon.png"
    },
  },
};
