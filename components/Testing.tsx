import useBaseStore from '@/stores/baseStore'
import React, { useEffect } from 'react'
import { text0, ghjson, text2, text3 } from '@/utils/test/gh' 

const Testing = () => {
  const {setRepoUrl, setRepoContents, setPhase1Response, setPhase2Response, setRepositoryLanguage, setTranslationLanguages} = useBaseStore()
  useEffect(() => {
    // setRepoUrl(text0)
    // setRepoContents(ghjson)
    // const lang1 = {name: 'Spanish', code: 'es'}
    // setRepositoryLanguage(lang1)
    // setPhase1Response(text2)
    // const lang2 = [{name: 'Italian', code: 'it'}, {name: 'Japanese', code: 'ja'}]
    // setTranslationLanguages(lang2)
    // const jsonStrings = text3.split(/```/g).filter((str) => str.trim().startsWith('{') && str.trim().endsWith('}'));
    // if (jsonStrings) {
    //   const translationsData: string[] = jsonStrings.map((jsonString) => jsonString.trim());
    //   setPhase2Response(translationsData);
    // }
  }, [])

  return null
}

export default Testing