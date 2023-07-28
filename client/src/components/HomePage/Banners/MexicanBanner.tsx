import styles from "./MexicanBanner.module.css";
import pickBanner from "../../../assets/HomePage/mex_banner.webp";
export default function MexicanBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={pickBanner} alt="mexican-banner" draggable={false}></img>
      </div>
    </div>
  );
}
