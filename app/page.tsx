import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import GitHubRow from '@/sections/firstphase/GitHubRow'
import IncludedItems from '@/sections/firstphase/IncludedItems'
import BaseLanguageSelector from '@/sections/firstphase/BaseLanguageSelector';
import ResumeAndProcess from '@/sections/firstphase/ResumeAndProcess';
import ResultPhaseOne from '@/sections/firstphase/ResultPhaseOne';
import OptionPhaseTwo from '@/sections/firstphase/OptionPhaseTwo';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-900 text-white">
      <div className='flex flex-col flex-grow w-full h-full'>
        <Header />
        
        <div className='flex w-full h-full'>
          <div className='w-1/4'><GitHubRow /></div>
          <div className='w-1/4 flex flex-col gap-4'>
            <IncludedItems />
            <BaseLanguageSelector />
            <ResumeAndProcess />
          </div>
          <div className='w-2/4 flex flex-col gap-4'>
            <ResultPhaseOne />
            <OptionPhaseTwo />
          </div>
        </div>

        <div className='flex w-full h-full'>
          <div className='w-1/4'></div>
          <div className='w-3/4'></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
