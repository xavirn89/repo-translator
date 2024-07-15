'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import useBaseStore from '@/stores/baseStore';
import { languages } from '@/constants/languages';
import 'flag-icons/css/flag-icons.min.css';
import { LanguageItem } from '@/types/languages';
import { openai } from '@/utils/ai-sdk/openaiProvider';
import { generateText } from 'ai';
import { promptgpt, promptgpt2 } from '@/utils/test/gh';

const LanguagesSelector: React.FC = () => {
  const {
    repositoryLanguage,
    translationLanguages,
    addTranslationLanguage,
    removeTranslationLanguage,
    phase1Response,
    phase2Response,
    setPhase2Response,
    setLoading
  } = useBaseStore();

  const [searchTermAdditional, setSearchTermAdditional] = useState('');
  const [filteredLanguagesAdditional, setFilteredLanguagesAdditional] = useState<LanguageItem[]>(languages);
  const [error, setError] = useState<string>('');

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

  const handleInputChangeAdditional = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTermAdditional(event.target.value);
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

  const handleGenerateTranslations = async () => {
    console.log(repositoryLanguage, translationLanguages, phase1Response);
    if (!repositoryLanguage || translationLanguages.length === 0 || !phase1Response) return;
  
    setLoading(true);
    console.log('Generating translations...');
  
    try {
      const textPrompt = promptgpt2(repositoryLanguage, translationLanguages, phase1Response);
      console.log(textPrompt);
      let { text } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: textPrompt,
      });
      console.log("--------------------------------------------------")
      console.log(JSON.stringify(text, null, 2));
  
      // Extract JSON strings
      const jsonStrings = text.split(/```/g).filter((str) => str.trim().startsWith('{') && str.trim().endsWith('}'));
      if (jsonStrings) {
        const translationsData: string[] = jsonStrings.map((jsonString) => jsonString.trim());
        setPhase2Response(translationsData);
      } else {
        setPhase2Response([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='flex flex-col w-full gap-2 p-6 h-full border-r border-t border-white'>
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

        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleGenerateTranslations}>
          Generate Translations
        </button>
      </div>
    </div>
  );
};

export default LanguagesSelector;
