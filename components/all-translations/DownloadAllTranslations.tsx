import React from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { LanguageItem } from '@/types/languages'

interface DownloadAllTranslationsProps {
  jsonCodes: string[]
  languages: LanguageItem[]
}

const DownloadAllTranslations: React.FC<DownloadAllTranslationsProps> = ({ jsonCodes, languages }) => {

  /**
   * Descarga un archivo JSON
   * In: index
   * Out: Descarga el archivo JSON correspondiente al índice
  **/
  const handleDownload = (index: number) => {
    const element = document.createElement('a')
    const file = new Blob([jsonCodes[index]], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `${languages[index].code}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  /**
   * Descarga todos los archivos JSON en un archivo ZIP
   * In: jsonCodes
   * Out: Descarga un archivo ZIP con todos los archivos JSON
  **/
  const handleDownloadAll = async () => {
    const zip = new JSZip()
    jsonCodes.forEach((code, index) => {
      zip.file(`${languages[index].code}.json`, code)
    })
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'translations.zip')
  }

  return (
    <div className='flex flex-col mt-8 gap-4'>
      <div className='text-xl'>Descargar archivos:</div>

      <div className='flex flex-wrap gap-4'>
        {jsonCodes.map((_, index) => (
          <div key={index} className='flex items-center gap-2 cursor-pointer border rounded-lg p-2 pr-3' onClick={() => handleDownload(index)}>
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
            <span className='text-white'>{languages[index]?.code}.json</span>
          </div>
        ))}
      </div>
      
      <div className='flex justify-end'>
        <button
          className='mt-8 w-fit p-2 bg-transparent text-lg text-green-500 rounded-lg border border-green-500 transition ease-in-out duration-300 hover:scale-105 hover:bg-green-400/25 hover:text-white'
          onClick={handleDownloadAll}
        >
          Descargar todos
        </button>
      </div>
    </div>
  )
}

export default DownloadAllTranslations
