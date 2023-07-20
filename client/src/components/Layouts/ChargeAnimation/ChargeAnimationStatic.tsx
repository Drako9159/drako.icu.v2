import { useConfigsStore } from "../../../store/configs";
import styles from "./ChargeAnimation.module.css";

export default function ChargeAnimationStatic() {
  const theme = useConfigsStore((state) => state.configs.theme);

  return (
    <div className={`${styles.containerSpinnerStatic}`}>
      <span
        className={`${styles.loader} ${
          theme === "night" ? styles.loaderNight : styles.loaderDay
        }`}
      ></span>
    </div>
  );
}
