'use client'
import React from 'react'
import Image from 'next/image'
import useHandleBack from '@/hooks/useHandleBack'

const Navbar = () => {
  const { goHome } = useHandleBack()

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
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Navbar