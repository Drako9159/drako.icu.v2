import { useConfigsStore } from "../../../store/configs";
import yellowDay from "./yellowDay.module.css";
import yellowNight from "./yellowNight.module.css";
import blueNight from "./blueNight.module.css";
import blueDay from "./blueDay.module.css";
import redNight from "./redNight.module.css";
import redDay from "./redDay.module.css";
import greenDay from "./greenDay.module.css";
import greenNight from "./greenNight.module.css";
import orangeDay from "./orangeDay.module.css";
import orangeNight from "./orangeNight.module.css";
import purpleDay from "./purpleDay.module.css";
import purpleNight from "./purpleNight.module.css";

export default function handleThemePost(theme: string) {
  const themeStore = useConfigsStore.getState().configs.theme;

  const library: { [key: string]: CSSModuleClasses } = {
    yellow: themeStore === "day" ? yellowDay : yellowNight,
    blue: themeStore === "day" ? blueDay : blueNight,
    red: themeStore === "day" ? redDay : redNight,
    green: themeStore === "day" ? greenDay : greenNight,
    orange: themeStore === "day" ? orangeDay : orangeNight,
    purple: themeStore === "day" ? purpleDay : purpleNight,
  };

  return library[theme];
}
