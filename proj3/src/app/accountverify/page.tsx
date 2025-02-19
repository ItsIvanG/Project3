import AccountVerify from '@/components/AccountVerify';
import Link from 'next/link';

export default function Page() {
  return (
    <main className='bg-secondary h-lvh flex flex-row justify-start items-start overflow-hidden'>
      <div className='hidden w-[45%] xl:flex h-full relative overflow-hidden'>
        <div className='absolute inset-0 bg-signup-bg bg-cover bg-left z-0'></div>
        {/* <div className='relative flex flex-col items-start justify-start h-full w-full px-20 py-5'>
          <Link
            href='/'
            className='flex items-center px-4 py-2 border border-secondary hover:bg-secondary/20 rounded-full text-secondary text-sm font-medium text-opacity-80 gap-3'
          >
            <IoMdArrowRoundBack className='text-lg' />
            Back to website
          </Link>
        </div> */}
      </div>

      <div className='bg-signup-bg bg-cover flex-col xl:items-start xl:bg-none bg-secondary w-full xl:w-[55%] h-full flex items-center justify-center gap-1 relative'>
        <div className='w-full h-10 xl:flex justify-start xl:justify-end absolute top-10 right-20 hidden'>
          <Link href='/'>
            <img src='/logo.png' className='w-full object-contain h-8' />
          </Link>
        </div>
        <AccountVerify />
      </div>
    </main>
  );
}
