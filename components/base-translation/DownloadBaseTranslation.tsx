import useBaseStore from '@/stores/baseStore';
import React from 'react'

const DownloadBaseTranslation = () => {
  const { baseTranslation, repositoryLanguage } = useBaseStore()

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([baseTranslation || ''], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${repositoryLanguage?.code}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className='flex flex-col mt-8 gap-4'>
      <div className='text-xl'>Descargar archivos:</div>
        <div className='flex gap-4'>
        {repositoryLanguage && (
          <div className='flex items-center gap-2 cursor-pointer border rounded-lg p-2 pr-3' onClick={handleDownload}>
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
            <span className='text-white'>{repositoryLanguage.code}.json</span>
          </div> 
        )}
        </div>
    </div>
  )
}

export default DownloadBaseTranslation