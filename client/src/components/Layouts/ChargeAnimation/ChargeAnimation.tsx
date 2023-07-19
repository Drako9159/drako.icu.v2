import { useEffect, useState } from "react";
import { useConfigsStore } from "../../../store/configs";
import styles from "./ChargeAnimation.module.css";

export default function ChargeAnimation({ delay }: { delay: any }) {
  const theme = useConfigsStore((state) => state.configs.theme);

  const [isCharge, setIsCharge] = useState({});

  useEffect(() => {
    if (!delay) {
      setIsCharge(styles.delay);
    } else {
      setIsCharge(styles.container)
    }
  }, [delay]);

  return (
    <div className={`${styles.container} ${isCharge}`}>
      <span
        className={`${styles.loader} ${
          theme === "night" ? styles.loaderNight : styles.loaderDay
        }`}
      ></span>
    </div>
  );
}
