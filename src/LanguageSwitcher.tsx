import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('ar')}>عربي</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};

export default LanguageSwitcher;