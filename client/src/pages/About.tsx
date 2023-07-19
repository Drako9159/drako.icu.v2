import Header from "../components/Layouts/Header/Header";
import Footer from "../components/Layouts/Footer/Footer";
import AboutMain from "../components/About/AboutMain";
import useSEO from "../hooks/useSEO";
import useLanguage from "../hooks/useLanguage";
import EditorMarkdown from "./EditorMarkdown";



export default function About() {
  useSEO(useLanguage().head.about);
  return (
    <>
      <Header activeLink={"about"} />
      <AboutMain />
      {/* <MyEditor /> */}
      <EditorMarkdown />
      <Footer />
    </>
  );
}









