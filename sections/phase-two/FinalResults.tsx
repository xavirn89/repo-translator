'use client'
import useBaseStore from '@/stores/baseStore';
import { LanguageItem } from '@/types/languages';
import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const FinalResults: React.FC = () => {
  const { loading, phase2Response, translationLanguages, repositoryLanguage, phase1Response } = useBaseStore();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [jsonCodes, setJsonCodes] = useState<string[]>([]);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);

  useEffect(() => {
    const codes = [];
    if (phase1Response) codes.push(phase1Response);
    phase2Response.forEach((item) => codes.push(item));
    setJsonCodes(codes);

    const langs = [];
    if (repositoryLanguage) langs.push(repositoryLanguage);
    translationLanguages.forEach((item) => langs.push(item));
    setLanguages(langs);
  }, [phase2Response]);

  const handleDownload = (index: number) => {
    const element = document.createElement('a');
    const file = new Blob([jsonCodes[index]], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${languages[index].code}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    jsonCodes.forEach((code, index) => {
      zip.file(`${languages[index].code}.json`, code);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'translations.zip');
  };

  console.log('Loading - phase2Response.length', loading, phase2Response.length);

  if (loading || !phase2Response || phase2Response.length === 0) return null;

  return (
    <div className='flex flex-col w-full items-center mb-10 h-full'>
      <div className='flex w-full max-w-7xl justify-between gap-4 h-full'>

        <div className='flex flex-col h-full w-2/3'>
          <div className='flex'>
            {languages.map((language, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === index ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {language.code}.json
              </button>
            ))}
          </div>
          {jsonCodes.map((item, index) => (
            <div
              key={index}
              className={`${
                activeTab === index ? 'block' : 'hidden'
              } w-full h-full`}
            >
              <textarea
                className='text-white w-full h-[800px] bg-slate-500/25 rounded-se-2xl rounded-b-2xl p-4 border border-slate-500/50'
                value={item}
                readOnly
              />
            </div>
          ))}
        </div>

        <div className='flex flex-col w-1/3 gap-4'>
          <div className='text-xl'>Descargar archivos:</div>
          <div className='flex gap-4'>
            {jsonCodes.map((_, index) => (
              <div key={index} className='flex items-center gap-2 cursor-pointer' onClick={() => handleDownload(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-description"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M9 17h6" />
                  <path d="M9 13h6" />
                </svg>
                <span className='text-white'>{languages[index].code}.json</span>
              </div>
            ))}
          </div>
          <div>
            <button className='bg-green-800 text-white px-4 py-2 rounded-lg' onClick={() => handleDownloadAll()}>
              Descargar todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalResults;
