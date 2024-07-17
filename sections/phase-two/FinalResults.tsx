'use client'
import useBaseStore from '@/stores/baseStore';
import React, { useState } from 'react';

const FinalResults: React.FC = () => {
  const { loading, phase2Response, translationLanguages } = useBaseStore();
  const [activeTab, setActiveTab] = useState<number>(0);

  if (loading || !phase2Response || phase2Response.length === 0) return null;

  const handleDownload = (index: number) => {
    const element = document.createElement('a');
    const file = new Blob([phase2Response[index]], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${translationLanguages[index].code}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className='flex flex-col w-full items-center mb-10 h-full'>
      <div className='flex flex-col w-full max-w-7xl h-full'>

        <div className='flex flex-col w-2/3 h-full'>
          <div className='flex justify-start'>
            {translationLanguages.map((language, index) => (
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
          <div className='flex flex-col w-full h-full'>
            {phase2Response.map((item, index) => (
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
        </div>

        <div className='flex w-1/3'>
          {phase2Response.map((_, index) => (
            <div key={index} className='flex items-center gap-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-description cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => handleDownload(index)}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M9 17h6" />
                <path d="M9 13h6" />
              </svg>
              <span className='text-white'>{translationLanguages[index].code}.json</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalResults;
