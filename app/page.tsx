'use client'
import React from 'react';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import RepoInput from '@/components/phase-one/RepoInput';
import Background from '@/components/Background';
import RepoInputBanner from '@/sections/phase-one/RepoInputBanner';
import RepoContents from '@/sections/phase-one/RepoContents';
import FirstResultAndTranslations from '@/sections/phase-two/FirstResultAndTranslations';
import FinalResults from '@/sections/phase-two/FinalResults';
import Testing from '@/components/Testing';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-900 text-white">
      <Background />
      <Testing />
      <div className='flex flex-col flex-grow w-full h-full z-50'>
        <Header />
        <div className='flex flex-col w-full h-full'>
          <RepoInput />
          <RepoInputBanner targetId="repo-loaded" />
        </div>

        <div className='flex flex-col w-full h-full' id="repo-loaded">
          <RepoContents targetId="base-translation-loading" />
        </div>

        <div className='flex flex-col w-full h-full' id="base-translation-loading">
          <FirstResultAndTranslations targetId="final-results" />
        </div>

        <div className='flex flex-col w-full h-full' id="final-results">
          <FinalResults />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
