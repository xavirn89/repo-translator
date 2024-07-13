import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import GitHubRow from '@/components/GitHubRow'
import IncludedItems from '@/components/IncludedItems'
import BaseLanguageSelector from '@/components/BaseLanguageSelector';
import ResumeAndProcess from '@/components/ResumeAndProcess';
import JsonPhase1 from '@/components/JsonPhase1';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-900 text-white">
      <div className='flex flex-col flex-grow w-full h-full'>
        <Header />
        <div className='flex w-full h-full'>
          <div className='w-1/4'><GitHubRow /></div>
          <div className='w-1/4'>
            <div className='flex flex-col w-full gap-4'>
              <IncludedItems />
              <BaseLanguageSelector />
              <ResumeAndProcess />
            </div>
          </div>
          <div className='w-2/4'>
            <div className='flex flex-col w-full gap 4'>
              <JsonPhase1 />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
