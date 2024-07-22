import { languages } from '@/constants/languages';
import useBaseStore from '@/stores/baseStore';
import { LanguageItem } from '@/types/languages';
import { promptPhaseTwo } from '@/utils/ai-sdk/prompts';
import { openai } from '@/utils/ai-sdk/openaiProvider';
import { generateText } from 'ai';
import React, { ChangeEvent, useEffect, useState } from 'react';
import useStateStore from '@/stores/stateStore';
import { AppStates } from '@/types/global';

const AdditionalLanguageSelector = () => {
  const {
    repositoryLanguage,
    translationLanguages,
    addTranslationLanguage,
    removeTranslationLanguage,
    baseTranslation,
    allTranslations,
    setAllTranslations,
    setLoading,
  } = useBaseStore();
  const { goToState } = useStateStore();

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

  const extractJsonStrings = (text: string): string[] => {
    // Match and extract JSON blocks from the text using regex
    const jsonBlocks = text.match(/```json\n([\s\S]*?)\n```/g);
    if (jsonBlocks) {
      return jsonBlocks.map((block) => block.replace(/```json\n|```/g, '').trim());
    }
  
    // Fallback to simpler extraction if no blocks were found
    const simpleJsonBlocks = text.match(/({[\s\S]*?})/g);
    if (simpleJsonBlocks) {
      return simpleJsonBlocks.map((block) => block.trim());
    }
  
    return [];
  };  

  const handleGenerateTranslations = async () => {
    if (!repositoryLanguage || translationLanguages.length === 0 || !baseTranslation || allTranslations.length > 0) return;

    setLoading(true);

    try {
      const textPrompt = promptPhaseTwo(repositoryLanguage, translationLanguages, baseTranslation);
      console.log(textPrompt);
      let { text } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: textPrompt,
      });

      console.log("RETURN AI:", text);

      let jsonStrings = extractJsonStrings(text);
      console.log("EXTRACTED JSON STRINGS:", jsonStrings);

      if (jsonStrings.length > 0) {
        const translationsData: string[] = jsonStrings.map((jsonString) => jsonString.trim());
        setAllTranslations(translationsData);
        goToState(AppStates.ALL_TRANSLATIONS);
      } else {
        setAllTranslations([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full gap-4'>
      <p className='text-xl'>Añadir lenguajes adicionales:</p>

      <div className='flex w-full gap-2 justify-between'>

        <input
          type="text"
          value={searchTermAdditional}
          onChange={handleInputChangeAdditional}
          placeholder="Selecciona los lenguajes"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className='w-fit p-2 bg-transparent text-xl text-green-500 rounded-lg border border-green-500 transition ease-in-out duration-300 hover:scale-105 hover:bg-green-400/25 hover:text-white' onClick={handleGenerateTranslations}>
          Generar
        </button>
      </div>

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
            className="flex items-center space-x-2 px-2 bg-gray-700 rounded cursor-pointer"
            onClick={() => handleRemoveAdditionalLanguage(lang.code)}
          >
            <span className={`fi fi-${lang.code} w-10 h-10`}></span>
            <span>{lang.name}</span>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default AdditionalLanguageSelector;
