import InputSearchContents from '@/components/repo-contents/InputSearchContents'
import SelectedContents from '@/components/repo-contents/SelectedContents'

const SelectContent = () => {

  return (
    <div className='relative flex flex-col w-full gap-2'>
      <div className='flex'>
        <p>Idioma del repositorio:</p>
      </div>

      <div className='flex w-full gap-6'>
        <div className='flex flex-col w-1/2'>
          <InputSearchContents />
        </div>

        <div className='w-1/2'>
          <SelectedContents />
        </div>
      </div>       
    </div>
  )
}

export default SelectContent