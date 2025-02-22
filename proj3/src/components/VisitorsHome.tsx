import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';

export function VisitorsHome() {
  return (
    <div className='w-full h-screen flex flex-row px-5 lg:px-24 bg-secondary'>
      <div className='w-full lg:w-[60%] bg-secondary flex flex-col items-center text-center lg:text-start lg:items-start justify-center gap-20 lg:gap-8 mt-14'>
        <div className='w-full'>
          <p className='font-extrabold text-primary text-5xl md:text-7xl xl:text-8xl '>
            Getting Quality Education is Now Easier!
          </p>
          <p className='font-medium text-primary/50 text-lg leading-tight mt-4 lg:mt-0'>
            Provides you with the latest online learning and material that help{' '}
            <br className='lg:flex hidden' />
            your knowledge grow.
          </p>
        </div>

        <div className='flex flex-col w-full lg:flex-row gap-5 lg:gap-7'>
          <Link
            href='/login'
            className='text-nowrap text-lg lg:text-2xl rounded-full bg-primary hover:bg-primary/90 text-secondary md:px-10 py-3'
          >
            Get started
          </Link>
          <div className='w-full justify-center lg:justify-start flex flex-row items-center gap-3 font-semibold'>
            <Link
              href='/'
              className='flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-secondary text-lg lg:text-2xl p-3'
            >
              <FaPlay className='text-white' />
            </Link>
            See how it works?
          </div>
        </div>
      </div>

      <div className='lg:w-[40%] flex items-center justify-center '>
        <div className='mt-16 hidden lg:flex'>
          <img src='/landing.png' />
        </div>
      </div>
    </div>
  );
}
