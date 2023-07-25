import { useEffect, useState } from "react";
import { useConfigsStore } from "../../../store/configs";
import styles from "./ChargeAnimation.module.css";
import { useLoadingStore } from "../../../store/loading";

export default function ChargeAnimation() {
  const theme = useConfigsStore((state) => state.configs.theme);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const [isCharge, setIsCharge] = useState({});

  useEffect(() => {
    if (!isLoading) {
      setIsCharge(styles.delay);
    } else {
      setIsCharge(styles.containerChargeAnimation);
    }
  }, [isLoading]);

  return (
    <div className={`${styles.containerChargeAnimation} ${isCharge}`}>
      <span
        className={`${styles.loader} ${
          theme === "night" ? styles.loaderNight : styles.loaderDay
        }`}
      ></span>
    </div>
  );
}
