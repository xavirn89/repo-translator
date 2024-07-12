import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import GitHubRow from '@/components/GitHubRow'
import IncludedItems from '@/components/IncludedItems'
import ResumeAndProcess from '@/components/ResumeAndProcess';
import LanguagesSelector from '@/components/LanguagesSelector';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-900 text-white">
      <div className='flex flex-col flex-grow w-full h-full'>
        <Header />
        <div className='flex w-full h-full'>
          <div className='w-1/4'><GitHubRow /></div>
          <div className='w-1/4'><IncludedItems /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
