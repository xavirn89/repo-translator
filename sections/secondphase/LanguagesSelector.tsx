'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import useBaseStore from '@/stores/baseStore';
import { languages } from '@/constants/languages';
import 'flag-icons/css/flag-icons.min.css';
import { LanguageItem } from '@/types/languages';

const LanguagesSelector: React.FC = () => {
  const {
    repositoryLanguage,
    setRepositoryLanguage,
    translationLanguages,
    addTranslationLanguage,
    removeTranslationLanguage
  } = useBaseStore();

  const [searchTermPrimary, setSearchTermPrimary] = useState('');
  const [searchTermAdditional, setSearchTermAdditional] = useState('');
  const [filteredLanguagesPrimary, setFilteredLanguagesPrimary] = useState<LanguageItem[]>(languages);
  const [filteredLanguagesAdditional, setFilteredLanguagesAdditional] = useState<LanguageItem[]>(languages);

  useEffect(() => {
    if (searchTermPrimary) {
      setFilteredLanguagesPrimary(
        languages.filter((lang) =>
          lang.name.toLowerCase().includes(searchTermPrimary.toLowerCase())
        )
      );
    } else {
      setFilteredLanguagesPrimary(languages);
    }
  }, [searchTermPrimary]);

  useEffect(() => {
    if (searchTermAdditional) {
      setFilteredLanguagesAdditional(
        languages.filter((lang) =>
          lang.name.toLowerCase().includes(searchTermAdditional.toLowerCase()) &&
          lang.code !== repositoryLanguage?.code &&
          !translationLanguages.some((additionalLang) => additionalLang.code === lang.code)
        )
      );
    } else {
      setFilteredLanguagesAdditional(
        languages.filter((lang) =>
          lang.code !== repositoryLanguage?.code &&
          !translationLanguages.some((additionalLang) => additionalLang.code === lang.code)
        )
      );
    }
  }, [searchTermAdditional, repositoryLanguage, translationLanguages]);

  const handleInputChangePrimary = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTermPrimary(event.target.value);
  };

  const handleInputChangeAdditional = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTermAdditional(event.target.value);
  };

  const handleLanguageSelectPrimary = (lang: LanguageItem) => {
    setRepositoryLanguage(lang);
    setSearchTermPrimary('');
  };

  const handleLanguageSelectAdditional = (lang: LanguageItem) => {
    if (!translationLanguages.some((l) => l.code === lang.code)) {
      addTranslationLanguage(lang);
    }
    setSearchTermAdditional('');
  };

  const handleRemoveAdditionalLanguage = (code: string) => {
    removeTranslationLanguage(code);
  };

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-2 relative'>
        <input
          type="text"
          value={searchTermPrimary}
          onChange={handleInputChangePrimary}
          placeholder="Search primary language"
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTermPrimary && (
          <ul className="absolute bg-gray-800 border border-gray-700 rounded shadow-lg z-10 max-h-60 overflow-auto w-full">
            {filteredLanguagesPrimary.map((lang) => (
              <li key={lang.code} onClick={() => handleLanguageSelectPrimary(lang)} className="p-2 hover:bg-gray-700 cursor-pointer flex items-center">
                <span className={`fi fi-${lang.code} mr-2`}></span> {lang.name}
              </li>
            ))}
          </ul>
        )}
        {repositoryLanguage && (
          <div className="flex items-center space-x-2 mt-2">
            <span className={`fi fi-${repositoryLanguage.code} w-10 h-10`}></span>
            <span>{repositoryLanguage.name}</span>
          </div>
        )}
      </div>
      <div className='flex flex-col space-y-2 relative'>
        <input
          type="text"
          value={searchTermAdditional}
          onChange={handleInputChangeAdditional}
          placeholder="Search additional languages"
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTermAdditional && (
          <ul className="absolute bg-gray-800 border border-gray-700 rounded shadow-lg z-10 max-h-60 overflow-auto w-full">
            {filteredLanguagesAdditional.map((lang) => (
              <li key={lang.code} onClick={() => handleLanguageSelectAdditional(lang)} className="p-2 hover:bg-gray-700 cursor-pointer flex items-center">
                <span className={`fi fi-${lang.code} mr-2`}></span> {lang.name}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap space-x-2 mt-2">
          {translationLanguages.map((lang) => (
            <div
              key={lang.code}
              className="flex items-center space-x-2 p-2 bg-gray-700 rounded cursor-pointer"
              onClick={() => handleRemoveAdditionalLanguage(lang.code)}
            >
              <span className={`fi fi-${lang.code} w-10 h-10`}></span>
              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagesSelector;
