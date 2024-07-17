import { languages } from '@/constants/languages';
import useBaseStore from '@/stores/baseStore';
import { LanguageItem } from '@/types/languages';
import { promptgpt2 } from '@/utils/test/gh';
import { openai } from '@/utils/ai-sdk/openaiProvider';
import { generateText } from 'ai';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface InProps {
  targetId: string;
}

const AdditionalLanguageSelector = ({ targetId }: InProps) => {
  const {
    repositoryLanguage,
    translationLanguages,
    addTranslationLanguage,
    removeTranslationLanguage,
    phase1Response,
    phase2Response,
    setPhase2Response,
    setLoading,
  } = useBaseStore();

  const [searchTermAdditional, setSearchTermAdditional] = useState('');
  const [filteredLanguagesAdditional, setFilteredLanguagesAdditional] = useState<LanguageItem[]>(languages);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (searchTermAdditional) {
      setFilteredLanguagesAdditional(
        languages.filter(
          (lang) =>
            lang.name.toLowerCase().includes(searchTermAdditional.toLowerCase()) &&
            lang.code !== repositoryLanguage?.code &&
            !translationLanguages.some((additionalLang) => additionalLang.code === lang.code)
        )
      );
    } else {
      setFilteredLanguagesAdditional(
        languages.filter(
          (lang) =>
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
    if (!repositoryLanguage || translationLanguages.length === 0 || !phase1Response) return;

    setLoading(true);

    try {
      const textPrompt = promptgpt2(repositoryLanguage, translationLanguages, phase1Response);
      console.log(textPrompt);
      let { text } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: textPrompt,
      });

      console.log("RETURN AI:", text);

      let jsonStrings = text.split(/```/g).filter((str) => str.trim().startsWith('{') && str.trim().endsWith('}'));
      console.log("FIRST TRY:", jsonStrings);
      if (jsonStrings.length === 0) {
        jsonStrings = text.split(/```json\n/g).filter((str) => {
          try {
            JSON.parse(str.trim());
            return true;
          } catch {
            return false;
          }
        });
        console.log("SECOND TRY:", jsonStrings);
      }
      console.log("NUMBER OF JSON STRINGS:", jsonStrings.length);
      if (jsonStrings.length > 0) {
        const translationsData: string[] = jsonStrings.map((jsonString) => jsonString.trim());
        setPhase2Response(translationsData);

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
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
    <div className='flex flex-col w-full gap-4'>
      <p className='text-xl'>Añadir lenguajes a traducir:</p>

      <input
        type="text"
        value={searchTermAdditional}
        onChange={handleInputChangeAdditional}
        placeholder="Selecciona los lenguajes adicionales"
        className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {searchTermAdditional && (
        <ul className="absolute mt-24 w-1/5 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
          {filteredLanguagesAdditional.map((lang) => (
            <li key={lang.code} onClick={() => handleLanguageSelectAdditional(lang)} className="block w-full text-left p-2 rounded bg-gray-900 hover:bg-slate-800 transform transition duration-200 cursor-pointer">
              <span className={`fi fi-${lang.code} mr-2`}></span> {lang.name}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap space-x-2">
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
        Generar Traducciones
      </button>
    </div>
  );
};

export default AdditionalLanguageSelector;
