'use client'
import React from 'react'
import useStateStore from '@/stores/stateStore'
import RepoContents from '@/sections/dashboard/RepoContents'
import { AppStates } from '@/types/global'
import BaseTranslation from '@/sections/dashboard/BaseTranslation'
import AllTranslations from '@/sections/dashboard/AllTranslations'

const Dashboard = () => {
  const { currentState } = useStateStore()

  console.log('Current state----->  ', currentState)

  if (currentState === AppStates.HOME) return null

  return (
    <div className='flex flex-col w-full items-center py-8'>
      <div className='flex flex-col w-full max-w-7xl justify-between gap-4'>

        {currentState === AppStates.REPOSITORY_CONTENTS && (
          <RepoContents />
        )}

        {currentState === AppStates.BASE_TRANSLATION && (
          <BaseTranslation />
        )}

        {currentState === AppStates.ALL_TRANSLATIONS && (
          <AllTranslations />
        )}

      </div>
    </div>
  )
}

export default Dashboard