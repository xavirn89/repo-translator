'use client'
import React from 'react'
import useStateStore from '@/stores/stateStore'
import RepoContents from '@/sections/dashboard/RepoContents'
import { AppStates } from '@/types/global'
import BaseTranslation from '@/sections/dashboard/BaseTranslation'
import AllTranslations from '@/sections/dashboard/AllTranslations'

const Dashboard: React.FC = () => {
  const { currentState } = useStateStore()

  if (currentState === AppStates.HOME) return null

  const renderContent = () => {
    switch (currentState) {
      case AppStates.REPOSITORY_CONTENTS:
        return <RepoContents />
      case AppStates.BASE_TRANSLATION:
        return <BaseTranslation />
      case AppStates.ALL_TRANSLATIONS:
        return <AllTranslations />
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col w-full items-center py-8'>
      <div className='flex flex-col w-full max-w-7xl justify-between gap-4'>
        {renderContent()}
      </div>
    </div>
  )
}

export default Dashboard
