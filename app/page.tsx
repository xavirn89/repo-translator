import React from 'react';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import RepoInput from '@/sections/phase-one/RepoInput';
import IncludedItems from '@/sections/firstphase/IncludedItems';
import BaseLanguageSelector from '@/sections/firstphase/BaseLanguageSelector';
import ResumeAndProcess from '@/sections/firstphase/ResumeAndProcess';
import ResultPhaseOne from '@/sections/firstphase/ResultPhaseOne';
import ScrollButton from '@/sections/firstphase/ScrollButton';
import LanguagesSelector from '@/sections/secondphase/LanguagesSelector';
import ResultPhaseTwo from '@/sections/secondphase/ResultPhaseTwo';
import Background from '@/components/Background';
import RepoInputBanner from '@/sections/phase-one/RepoInputBanner';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-900 text-white">
      <Background />
      <div className='flex flex-col flex-grow w-full h-full z-50'>
        <Header />


        <div className='flex flex-col flex-grow w-full'>
          <RepoInput />
          <RepoInputBanner />
        </div>

        {/* <div className='flex w-full'>
          <div className='w-1/4'>
            <RepoInput />
          </div>
          <div className='w-1/4 flex flex-col gap-4'>
            <IncludedItems />
            <BaseLanguageSelector />
            <ResumeAndProcess />
          </div>
          <div className='w-2/4 flex flex-col gap-4'>
            <ResultPhaseOne />
            <ScrollButton targetId="target-section" />
          </div>
        </div>

        <div className='flex w-full'>
          <div id="target-section" className='w-1/4'>
            <LanguagesSelector />
          </div>
          <div className='w-3/4'>
            <ResultPhaseTwo />
          </div>
        </div>

        <div className='flex w-full justify-center'>
          <div className='flex w-full max-w-3xl my-20'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
