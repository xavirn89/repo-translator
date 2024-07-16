import React, { useEffect } from 'react'
import { RepositoryItem } from '@/types/github';
import { openai } from '@/utils/ai-sdk/openaiProvider';
import { generateText } from 'ai';
import useBaseStore from '@/stores/baseStore';
import { promptPhaseOne } from '@/utils/ai-sdk/prompts';

interface InProps {
  targetId: string
}

const ButtonProcessPhaseOne = ({ targetId }: InProps) => {
  const { selectedContents, setLoading, allFilesContent, setAllFilesContent, loading, repositoryLanguage, setPhase1Response } = useBaseStore();

  const handleProcessPhaseOne = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    handleProcessSelectedContents();
  }

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

  const handleProcessSelectedContents = async () => {
    setLoading(true);
    let allContents: { [key: string]: string } = {};

    try {
      for (const item of selectedContents) {
        const contents = await fetchAllFiles(item);
        allContents = { ...allContents, ...contents };
      }
      setAllFilesContent(allContents);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!allFilesContent || Object.keys(allFilesContent).length === 0 || !repositoryLanguage) return 

    const cleaned: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(allFilesContent)) {
      cleaned[key] = value.replace(/\s+/g, ' ');
    }

    const createPromptAndGenerateJSON = async (cleaned: { [key: string]: string }) => {
      try {
        let { text } = await generateText({
          model: openai('gpt-4-turbo'),
          prompt: promptPhaseOne(repositoryLanguage) + Object.values(cleaned).join(' '),
        });
        console.log(JSON.stringify(text, null, 2));
        if (text.startsWith('```json')) {
          text = text.slice(7);
        }
        if (text.endsWith('```')) {
          text = text.slice(0, -3);
        }
        setPhase1Response(text);
      } catch (err: any) {
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    createPromptAndGenerateJSON(cleaned);
  }, [allFilesContent]);

  return (
    <div className='relative flex w-full gap-6 mt-10'>
      <div className='w-1/2'>
      </div>

      <div className='flex w-1/2 justify-center'>
        <button className='w-52 py-2 bg-green-500 rounded text-white font-bold hover:bg-green-700 transition duration-200' onClick={handleProcessPhaseOne}>
          Generar Traducción
        </button>
      </div>
    </div>
  )
}

export default ButtonProcessPhaseOne