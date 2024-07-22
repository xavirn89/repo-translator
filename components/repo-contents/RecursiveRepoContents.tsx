import { RepositoryItem } from '@/types/github'
import React, { useState } from 'react'

const RecursiveRepoContents: React.FC<{ items: RepositoryItem[], level: number }> = ({ items, level }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

  const handleToggle = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className='flex flex-col w-full'>
      {items.map((item, index) => (
        <div key={index} className={`p-1 bg-slate-500/25 mb-0.5 ml-${level * 4} rounded-lg px-3 py-1`}>
          <div onClick={() => handleToggle(index)} className="cursor-pointer flex items-center justify-between">
            <p className='text-sm'>{item.name}</p>
            {item.type === 'dir' && (
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${expanded[index] ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>

          {item.content && expanded[index] && (
            <div className="transition-all duration-300 ease-in-out">
              <RecursiveRepoContents items={item.content} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RecursiveRepoContents