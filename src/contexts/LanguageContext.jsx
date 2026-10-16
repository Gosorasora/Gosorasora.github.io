import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();
const LANGS = ['kr', 'en', 'jp'];

// First visit language: ?lang= link, then the last choice, then a Japanese browser, else Korean.
const initialLanguage = () => {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (LANGS.includes(saved)) return saved;
  } catch { /* storage blocked: fall through */ }
  return (navigator.language || '').toLowerCase().startsWith('ja') ? 'jp' : 'kr';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(initialLanguage);

  // screen readers and line breaking follow the page language
  useEffect(() => {
    document.documentElement.lang = { kr: 'ko', en: 'en', jp: 'ja' }[language];
  }, [language]);

  const toggleLanguage = () => {};

  const setLang = (lang) => {
    setLanguage(lang);
    try { localStorage.setItem('lang', lang); } catch { /* ignore */ }
    // keep the address shareable: gosorasora.github.io/?lang=jp opens Japanese directly
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
