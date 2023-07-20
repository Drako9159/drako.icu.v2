import styles from "./Layout.module.css";
import { useConfigsStore } from "../../../store/configs";
import themeLibrary from "../../../theme/theme";

export default function Layout({ children }: any) {
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);
  return (
    <div style={color.layout} className={styles.containerLayout}>
      {children}
    </div>
  );
}
