import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='flex flex-col w-full items-center mb-10'>
      <div className='flex w-full max-w-5xl justify-between py-8'>
        <Image
          src="/icons/repotranslator.png"
          width={200}
          height={100}
          alt="Picture of the author"
        />
        <div className='flex gap-2'>
          <p>Home</p>
          <p>Docs</p>
          <p>GitHub</p>
        </div>
      </div>

      <div className='flex flex-col w-full max-w-3xl mt-10'>
        <p className='text-center text-xl'>Genera fácilmente los archivos de traducción de tu proyecto mediante un enlace a tu repositorio en GitHub.</p>
        <p className='text-center text-xl mt-10'>Mediante IA identificamos el texto visible y generamos los archivos de traducción para todos los idiomas seleccionados.</p>
      </div>
    </div>
  )
}

export default Header