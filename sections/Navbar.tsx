'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import useHandleBack from '@/hooks/useHandleBack'
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal';
import useBaseStore from '@/stores/baseStore';

const Navbar: React.FC = () => {
  const { goHome } = useHandleBack()
  const [key, setKey] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { setCustomOpenAIKey, customOpenAIKey } = useBaseStore()
  const [open, setOpen] = useState<boolean>(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const handleToggleVisibility = () => setIsVisible(!isVisible)
  const handleDeleteKey = () => {
    setKey('')
    setCustomOpenAIKey(null)
  }

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex w-full max-w-5xl justify-between pt-8'>
        <Image
          src="/icons/repotranslator.png"
          width={150}
          height={50}
          className='w-auto h-auto cursor-pointer'
          alt="Picture of the author"
          onClick={goHome}
        />
        <div className='flex gap-2 items-center justify-end'>
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="icon icon-tabler icon-tabler-settings transition-transform duration-300 ease-in-out hover:rotate-90 cursor-pointer" 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="#ffffff" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            onClick={onOpenModal}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          </svg>
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} classNames={{ modal: 'flex w-1/3 h-fit top-1/4 rounded-2xl text-white gap-4' }} styles={{ modal: { background: '#3B424E' } }}>
        <div className='flex flex-col'>
          <h2 className='text-xl font-bold mb-5'>OpenAI Key</h2>
          <p>Añade tu API Key de OpenAI si los tokens de la página se han agotado</p>
          <p>La API Key debe tener permisos para el modelo gpt-4-turbo</p>
          <div className='relative mt-10'>
            <input 
              type={isVisible ? "text" : "password"} 
              className='w-full bg-gray-500 text-white rounded-lg p-2' 
              placeholder='API Key' 
              value={key} 
              onChange={(e) => setKey(e.target.value)} 
            />
            <button 
              className='absolute inset-y-0 right-0 px-3 py-2 text-gray-400'
              onClick={handleToggleVisibility}
            >
              {isVisible ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className='flex justify-end mt-6'>
            <button 
              className='bg-blue-500 text-white rounded-lg p-2 mr-2' 
              onClick={() => { setCustomOpenAIKey(key); onCloseModal() }}
            >
              Guardar
            </button>
            {customOpenAIKey && (
              <button 
                className='bg-red-500 text-white rounded-lg p-2' 
                onClick={handleDeleteKey}
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Navbar
