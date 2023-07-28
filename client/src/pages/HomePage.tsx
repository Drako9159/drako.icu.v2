import Header from "../components/Layouts/Header/Header";
import Footer from "../components/Layouts/Footer/Footer";
import useSEO from "../hooks/useSEO";
import useLanguage from "../hooks/useLanguage";
import HomePageMain from "../components/HomePage/HomePageMain";
import MexicanBanner from "../components/HomePage/Banners/MexicanBanner";

export default function HomePage() {
  useSEO(useLanguage().head.home);
  return (
    <>
      <Header activeLink="/" />
      <HomePageMain />
      <MexicanBanner />
      <Footer />
    </>
  );
}
