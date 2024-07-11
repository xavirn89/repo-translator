// ResumeAndProcess.tsx
'use client';
import useBaseStore from '@/stores/baseStore';
import React, { use, useEffect, useState } from 'react';
import { RepositoryItem } from '@/types/github';
import { openai } from '@/utils/ai-sdk/openaiProvider';
import { generateText } from 'ai';
import { promptgpt } from '@/utils/test/gh'
import { json } from 'stream/consumers';

const ResumeAndProcess: React.FC = () => {
  const { selectedContents, setLoading, allFilesContent, setAllFilesContent, loading, repositoryLanguage, translationLanguages } = useBaseStore();
  const [error, setError] = useState<string>('');
  const [allFilesContentCleaned, setAllFilesContentCleaned] = useState<{ [key: string]: string }>({});
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [auxTest, setAuxTest] = useState<any>(null);

  useEffect(() => {
    const text = `The original text is in ${repositoryLanguage?.name}. Please generate the JSON in ${repositoryLanguage?.name} with orthographic corrections. Then, ALSO create another JSONs into the following languages: ${translationLanguages.map((lang) => lang.name).join(', ')}. Label each JSON with the corresponding language code.`;
    setAuxTest(text);
  }, [repositoryLanguage, translationLanguages]);
  

  const fetchAllFiles = async (item: RepositoryItem): Promise<{ [key: string]: string }> => {
    let contents: { [key: string]: string } = {};

    const fetchFileContent = async (url: string): Promise<string> => {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      } else {
        throw new Error(`Failed to fetch file content from ${url}`);
      }
    };

    const fetchDirectoryContents = async (url: string): Promise<RepositoryItem[]> => {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Failed to fetch directory contents from ${url}`);
      }
    };

    const traverse = async (item: RepositoryItem): Promise<void> => {
      if (item.type === 'file' && item.download_url) {
        contents[item.path] = await fetchFileContent(item.download_url);
      } else if (item.type === 'dir' && item.url) {
        const dirContents = await fetchDirectoryContents(item.url);
        for (const contentItem of dirContents) {
          await traverse(contentItem);
        }
      }
    };

    await traverse(item);
    return contents;
  };

  const handleResumeClick = async () => {
    setLoading(true);
    setError('');
    let allContents: { [key: string]: string } = {};

    try {
      for (const item of selectedContents) {
        const contents = await fetchAllFiles(item);
        allContents = { ...allContents, ...contents };
      }
      setAllFilesContent(allContents);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateText = async () => {
    setLoading(true);
    setError('');
    try {
      const { text } = await generateText({
        model: openai('gpt-3.5-turbo'),
        prompt: promptgpt + Object.values(allFilesContentCleaned).join(' '),
      });
      console.log(promptgpt + Object.values(allFilesContentCleaned).join(' '))
      // Handle the text output as needed
      setJsonResponse(text);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleaned: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(allFilesContent)) {
      cleaned[key] = value.replace(/\s+/g, ' ');
    }
    setAllFilesContentCleaned(cleaned);
  }, [allFilesContent]);

  useEffect(() => {
    console.log(JSON.stringify(jsonResponse, null, 2))
  }, [jsonResponse]);

  return (
    <div className='flex flex-col w-full max-w-3xl'>
      <button 
        className='p-2 rounded bg-blue-500 text-white'
        onClick={handleResumeClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Resume'}
      </button>
      <button 
        className='p-2 rounded bg-green-500 text-white mt-2'
        onClick={handleGenerateText}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Text'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {jsonResponse && <pre className='text-white mt-2'>{jsonResponse}</pre>}
    </div>
  );
};

export default ResumeAndProcess;
