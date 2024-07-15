'use client';

import useBaseStore from '@/stores/baseStore';
import React from 'react';

const ResultPhaseTwo = () => {
  const { phase2Response } = useBaseStore();

  return (
    <div className='flex flex-col w-full gap-2 p-6 h-full'>
      {phase2Response && phase2Response.map((item, index) => (
        <div key={index} className='flex flex-col mb-4'>
          <h3 className='text-lg font-bold text-white mb-2'>Translation {index + 1}</h3>
          <textarea
            className='text-white bg-gray-800 p-4 rounded h-64 w-full resize-none'
            value={item}
            readOnly
          />
        </div>
      ))}
    </div>
  );
};

export default ResultPhaseTwo;
