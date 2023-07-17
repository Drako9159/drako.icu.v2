import { es } from "./es";
import { en } from "./en";
import { LanguageStructure } from "./language.types";

export default function languageLibrary(language: string): LanguageStructure {
  const languages: { [key: string]: LanguageStructure } = {
    es: es,
    en: en,
  };

  return languages[language];
}
