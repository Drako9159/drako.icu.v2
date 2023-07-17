export interface LanguageStructure {
    about: { text1: string; text2: string };
    blog: { text1: string; text2: string };
    footer: { rights: string; name: string; legend: string };
    header: { home: string; nav: string[] };
    home: { text: string; button1: string; button2: string; button3: string };
    posts: { text1: string };
    head: {
      home: { description: string; title: string; link: string; image: string };
      about: { description: string; title: string; link: string; image: string };
      blog: { description: string; title: string; link: string; image: string };
    };
  }
  