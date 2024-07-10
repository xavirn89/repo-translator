'use client'
import React, { useState, ChangeEvent } from 'react'
import { RepositoryItem, RepositoryItemLinks } from '@/types/github'
import useBaseStore from '@/stores/baseStore'

const Home: React.FC = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents } = useBaseStore();
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleFetchFiles = async () => {
    if (!repoUrl) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    try {
      setError('');
      const [owner, repo] = repoUrl.split('/').slice(-2);
      if (!owner || !repo) {
        throw new Error('Invalid GitHub repository URL');
      }
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
      if (!response.ok) {
        throw new Error('Invalid repository URL or repository not found');
      }
      setRepoContents(await response.json());
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={repoUrl || ''}
          onChange={handleInputChange}
          placeholder="Enter GitHub repository URL"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchFiles}
          className="w-full p-2 mb-4 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Files
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-2">
          {repoContents && repoContents.map((repoContent) => (
            <li key={repoContent.sha}>
              <a
                href={repoContent.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 rounded bg-gray-800 hover:bg-gray-700"
              >
                {repoContent.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
