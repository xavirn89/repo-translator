'use client'
import React from 'react'
import useStateStore from '@/stores/stateStore'

const Header = () => {
  const { home } = useStateStore()

  if (!home) return null
  
  if (home) return (
    <div className='flex flex-col w-full items-center mb-10'>
      <div className='flex flex-col w-full max-w-3xl mt-10'>
        <p className='text-center text-xl'>Genera fácilmente los archivos de traducción de tu proyecto mediante un enlace a tu repositorio en GitHub.</p>
        <p className='text-center text-xl mt-10'>Mediante IA identificamos el texto visible y generamos los archivos de traducción para todos los idiomas seleccionados.</p>
      </div>
    </div>
  )
}

export default Header