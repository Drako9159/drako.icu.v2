import { es } from "../languages/es";
import { en } from "../languages/en";
import { LanguageStructure } from "../languages/language.types";
import { useConfigsStore } from "../store/configs";

export default function useLanguage(): LanguageStructure {
  const language = useConfigsStore((state) => state.configs.language);
  const languages: { [key: string]: LanguageStructure } = {
    es: es,
    en: en,
  };

  return languages[language];
}
