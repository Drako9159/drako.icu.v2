import { useConfigsStore } from "../../../store/configs";
import themeLibrary from "../../../theme/theme";
import { Link } from "react-router-dom";
import styles from "./404NotFound.module.css";

export default function NotFound() {
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);

  return (
    <div style={color.textDisable} className={styles.container}>
      <h2>404 Not Found</h2>
      <Link className={styles.button} style={color.textDisable} to="/" aria-label="Home Page">
        Back
      </Link>
    </div>
  );
}
