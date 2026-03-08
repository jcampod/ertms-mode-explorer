import { createContext, useContext, useState, useCallback } from 'react';
import type { Language, LanguageTranslations } from './types';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: LanguageTranslations | null;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  translations: null,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

// Static imports for all language barrels (app is small, no need for dynamic import)
import { esTranslations } from './es';
import { deTranslations } from './de';
import { frTranslations } from './fr';
import { itTranslations } from './it';

function getTranslations(lang: Language): LanguageTranslations | null {
  switch (lang) {
    case 'en':
      return null; // English is the default — zero overhead
    case 'es':
      return esTranslations;
    case 'de':
      return deTranslations;
    case 'fr':
      return frTranslations;
    case 'it':
      return itTranslations;
    default:
      return null;
  }
}

export function useLanguageProvider() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ertms-language');
      if (stored && ['en', 'es', 'de', 'fr', 'it'].includes(stored)) {
        return stored as Language;
      }
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ertms-language', lang);
  }, []);

  const translations = getTranslations(language);

  return { language, setLanguage, translations };
}
