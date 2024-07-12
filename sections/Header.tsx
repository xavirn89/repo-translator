import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-col w-full items-center mb-10'>
      <div className='flex w-full max-w-5xl justify-between p-4'>
        <p>Repo Translator</p>
        <div className='flex gap-2'>
          <p>Home</p>
          <p>Docs</p>
          <p>GitHub</p>
        </div>
      </div>

      <div className='flex w-full max-w-3xl mt-10'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  )
}

export default Header