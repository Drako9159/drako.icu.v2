import { useEffect, useState } from "react";
import styles from "./ToastNotify.module.css";
import { useToastStore } from "../../../store/toastNotify";
export default function ToastNotify() {
  const [showNotification, setShowNotification] = useState(false);
  const toastNotify = useToastStore((state) => state.notify);
  const [colorNotify, setColorNotify] = useState(styles.colorStatic);

  useEffect(() => {
    setShowNotification(true);

    if (toastNotify.color === "blue") {
      setColorNotify(styles.colorStatic);
    } else if (toastNotify.color === "green") {
      setColorNotify(styles.colorSuccess);
    } else if (toastNotify.color === "red") {
      setColorNotify(styles.colorError);
    }

    // const timeoutId = setTimeout(() => {
    //   setShowNotification(false);
    // }, 3000);

    // return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`${styles.containerToastNotify} ${
        showNotification ? styles.containerToastNotifyShow : ""
      } ${showNotification ? styles.addAnimation : ""} ${colorNotify}`}
    >
      <span>{toastNotify.message}</span>
    </div>
  );
}
