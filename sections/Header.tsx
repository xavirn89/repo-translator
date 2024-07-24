'use client'
import React from 'react'
import useStateStore from '@/stores/stateStore'
import { AppStates } from '@/types/global'

const Header: React.FC = () => {
  const { currentState } = useStateStore()

  if (currentState !== AppStates.HOME) return null
  
  return (
    <header className='flex flex-col w-full items-center my-10'>
      <div className='flex flex-col w-full max-w-3xl pt-10'>
        <p className='text-center text-xl'>
          Genera fácilmente los archivos de traducción de tu proyecto mediante un enlace a tu repositorio en GitHub.
        </p>
        <p className='text-center text-xl mt-10'>
          Mediante IA identificamos el texto visible y generamos los archivos de traducción para todos los idiomas seleccionados.
        </p>
      </div>
    </header>
  );
};

export default Header
