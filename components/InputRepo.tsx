'use client'
import React, { useState, useEffect } from 'react';
import useBaseStore from '@/stores/baseStore';
import debounce from 'lodash/debounce';
import useStateStore from '@/stores/stateStore';
import { AppStates } from '@/types/global';
import useHandleBack from '@/hooks/useHandleBack';
import { fetchRepoContents } from '@/utils/github';

const InputRepo: React.FC = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents, setLoading } = useBaseStore();
  const { currentState, goToState } = useStateStore();
  const [error, setError] = useState<string>('');
  const { goBack } = useHandleBack();

  useEffect(() => {
    if (!repoUrl || repoContents) return;

    const debouncedFetchFiles = debounce(async (url: string) => {
      try {
        setLoading(true);
        setError('');
        const [owner, repo] = url.split('/').slice(-2);
        if (!owner || !repo) {
          throw new Error('Invalid GitHub repository URL');
        }
        const repoContentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
        const contents = await fetchRepoContents(repoContentsUrl);
        setRepoContents(contents);
        goToState(AppStates.REPOSITORY_CONTENTS);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);

    debouncedFetchFiles(repoUrl);

    return () => {
      debouncedFetchFiles.cancel(); 
    };
  }, [repoUrl, setRepoContents, setLoading, goToState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <div className='flex flex-col gap-2 p-6 items-center'>
      <div className='flex w-full items-center pt-10'>
        <div className='flex w-1/3 justify-end pr-6'>
          {currentState !== AppStates.HOME && (
            <button className='p-2 bg-transparent text-red-400 rounded-lg border border-red-400 transition ease-in-out duration-300 hover:scale-105 hover:bg-red-400/25 hover:text-white' onClick={handleGoBack}>
              Atrás
            </button>
          )}
        </div>

        <div className='flex w-1/3'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brand-github mr-2"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
          </svg>
          <input
            type="text"
            value={repoUrl || ''}
            onChange={handleInputChange}
            placeholder="Enter GitHub repository URL"
            className="w-full px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default InputRepo;
