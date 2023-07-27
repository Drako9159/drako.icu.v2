import { useEffect, useState } from "react";
import styles from "./ToastNotify.module.css";
import { useToastStore } from "../../../store/toastNotify";
export default function ToastNotify() {
  const [colorNotify, setColorNotify] = useState(styles.colorStatic);
  const notify = useToastStore((state) => state.notify);
  const active = useToastStore((state) => state.active);
  const deactivate = useToastStore((state) => state.deactivate);

  useEffect(() => {
    timer();
    if (notify.color === "blue") {
      setColorNotify(styles.colorStatic);
    } else if (notify.color === "green") {
      setColorNotify(styles.colorSuccess);
    } else if (notify.color === "red") {
      setColorNotify(styles.colorError);
    }
  }, [active]);

  function timer() {
    const timeoutId = setTimeout(() => {
      deactivate(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }

  return (
    <div
      className={`${styles.containerToastNotify} ${colorNotify} ${
        active ? styles.addAnimation : ""
      }`}
    >
      <span>{notify.message}</span>
    </div>
  );
}
