import { useNavigate } from "react-router-dom";
import { useConfigsStore } from "../../../store/configs";
import themeLibrary from "../../../theme/theme";
import styles from "./400BadRequest.module.css";

export default function NotRequest({ status }: { status: number }) {
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);

  const navigate = useNavigate();

  function handleReload() {
    navigate("/");
    //window.location.reload(false);
  }

  return (
    <div className={styles.container400BadRequest}>
      <h3 style={color.textEnable}>{status} &nbsp; ¡Oh, no!</h3>
      <button
        className={`${styles.button} ${
          theme === "night" ? styles.buttonNight : styles.buttonDay
        }`}
        onClick={handleReload}
      >
        Refresh Page
      </button>
    </div>
  );
}
