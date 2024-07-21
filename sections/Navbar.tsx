import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex w-full max-w-5xl justify-between pt-8'>
        <Image
          src="/icons/repotranslator.png"
          width={150}
          height={50}
          className='w-auto h-auto'
          alt="Picture of the author"
        />
        <div className='flex gap-2'>
          <p>Home</p>
          <p>Docs</p>
          <p>GitHub</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar