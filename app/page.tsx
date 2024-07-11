'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { RepositoryItem } from '@/types/github'
import useBaseStore from '@/stores/baseStore'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import GitHubRow from '@/components/GitHubRow'

const Home: React.FC = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents } = useBaseStore();
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<RepositoryItem[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);



  

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectItem = (item: RepositoryItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (item: RepositoryItem) => {
    setSelectedItems(selectedItems.filter(selected => selected.sha !== item.sha));
  };

  const filteredContents = repoContents?.filter(content => 
    content.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
    !selectedItems.some(selected => selected.sha === content.sha)
  );



  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className='flex flex-col w-full items-center'>
        <GitHubRow />
      </div>
      

      {repoContents && !loading && (
      <div className='flex'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search files"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ul className="space-y-2 mb-4">
          {debouncedSearchTerm && filteredContents?.map((repoContent) => (
            <li key={repoContent.sha}>
              <button
                onClick={() => handleSelectItem(repoContent)}
                className="block w-full text-left p-2 rounded bg-gray-800 hover:bg-slate-700 transform transition duration-200"
              >
                {repoContent.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap space-x-2">
          {selectedItems.map((item) => (
            <div
              key={item.sha}
              onClick={() => handleRemoveItem(item)}
              className="flex items-center p-2 mb-2 bg-gray-700 rounded cursor-pointer transform hover:scale-105 hover:bg-red-700 transition duration-200"
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
