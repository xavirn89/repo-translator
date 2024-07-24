import React from 'react'
import Navbar from '@/sections/Navbar'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import InputRepo from '@/components/InputRepo'
import Background from '@/components/Background'
import RepoInputBanner from '@/components/RepoInputBanner'
import Dashboard from '@/sections/dashboard/Dashboard'
import Loading from '@/components/Loading'

const Home: React.FC = () => {
  
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-900 text-white">
      <Background />

      <div className='flex flex-col flex-grow w-full h-full z-50'>
        <Navbar />
        <Header />

        <div className='flex flex-col'>
          <InputRepo />
          <RepoInputBanner />
        </div>

        <div className='flex flex-col'>
          <Dashboard />
          <Loading />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
