import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('kr'); // Default to Korean as per context

  const toggleLanguage = () => {};

  const setLang = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
