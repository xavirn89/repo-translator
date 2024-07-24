'use client'
import React, { useState, useEffect, ChangeEvent, FocusEvent } from 'react'
import useBaseStore from '@/stores/baseStore'
import { languages } from '@/constants/languages'
import 'flag-icons/css/flag-icons.min.css'
import { LanguageItem } from '@/types/languages'

const SelectOriginalLanguage: React.FC = () => {
  const { repositoryLanguage, setRepositoryLanguage } = useBaseStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredLanguages, setFilteredLanguages] = useState<LanguageItem[]>(languages)
  const [showLanguageList, setShowLanguageList] = useState<boolean>(false)

  // Filtra los idiomas según el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      setFilteredLanguages(
        languages.filter((lang) =>
          lang.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      setShowLanguageList(true)
    } else {
      setFilteredLanguages(languages)
    }
  }, [searchTerm])

  // Actualiza el término de búsqueda
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Selecciona el idioma del repositorio
  const handleLanguageSelect = (lang: LanguageItem) => {
    setRepositoryLanguage(lang)
    setSearchTerm('')
    setShowLanguageList(false)
  }

  // Muestra la lista de idiomas al enfocar el input
  const handleInputFocus = () => {
    setShowLanguageList(true)
    setFilteredLanguages(languages)
  }

  // Oculta la lista de idiomas al desenfocar el input
  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setShowLanguageList(false)
    }
  }

  return (
    <div className='relative flex flex-col w-full gap-2'>
      <div className='flex'>
        <p>Idioma del repositorio:</p>
      </div>

      <div className='flex w-full gap-6'>
        <div className='flex flex-col w-1/2'>
          <div className='flex flex-col space-y-2 relative'>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Selecciona el idioma principal"
              className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-11 w-full"
            />
            {showLanguageList && (
              <ul className="absolute top-10 w-full bg-gray-800 border border-gray-700 rounded shadow-lg z-10 max-h-60 overflow-auto">
                {filteredLanguages.map((lang) => (
                  <li
                    key={lang.code}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleLanguageSelect(lang)}
                    className="p-2 hover:bg-gray-700 cursor-pointer flex items-center"
                  >
                    <span className={`fi fi-${lang.code} mr-2`}></span> {lang.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className='w-1/2'>
          {repositoryLanguage && (
            <div className="flex items-center py-0.5 px-3 bg-gray-700 rounded w-fit">
              <span className={`fi fi-${repositoryLanguage.code} w-10 h-10`}></span>
              <span>{repositoryLanguage.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectOriginalLanguage
