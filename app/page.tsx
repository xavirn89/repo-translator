import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import GitHubRow from '@/components/GitHubRow'
import IncludedItems from '@/components/IncludedItems'
import ResumeAndProcess from '@/components/ResumeAndProcess';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className='flex flex-col w-full items-center'>
        <GitHubRow />
        <IncludedItems />
        <ResumeAndProcess />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
