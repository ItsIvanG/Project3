import ForgotPass from '@/components/ForgotPass';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Page() {
  return (
    <main className='bg-white-basic h-lvh flex flex-row justify-start items-start overflow-hidden'>
      <div className='w-[45%] h-full relative overflow-hidden'>
        <div className='absolute inset-0 bg-signup-bg bg-cover bg-left z-0'></div>
        <div className='relative flex flex-col items-start justify-start h-full w-full p-8'>
          <a
            href='/'
            className='flex items-center px-4 py-2 border border-secondary rounded-full text-secondary text-sm font-medium text-opacity-80 gap-3'
          >
            <IoMdArrowRoundBack className='text-lg' />
            Back to website
          </a>
        </div>
      </div>

      <div className='bg-secondary w-[55%] h-full flex items-center justify-center'>
        <ForgotPass />
      </div>
    </main>
  );
}
