
import { day } from "./day";
import { night } from "./night";
import { ThemeStructure } from "./theme.types";

export default function themeLibrary(theme: string) {
  const themes: { [key: string]: ThemeStructure } = {
    day: day,
    night: night,
  };
  return themes[theme];
}
