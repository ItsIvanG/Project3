import { FaPlay } from 'react-icons/fa';

export function VisitorsHome() {
  return (
    <div className='w-full h-screen flex flex-row px-24 bg-secondary'>
      <div className='w-[60%] bg-secondary flex flex-col items-start justify-center gap-8 mt-14'>
        <div className=''>
          <p className='font-extrabold text-primary text-8xl '>
            Getting Quality Education is Now Easier!
          </p>
          <p className='font-medium text-primary/50 text-lg leading-tight'>
            Provides you with the latest online learning and material that help{' '}
            <br />
            your knowledge grow.
          </p>
        </div>

        <div className='flex flex-row gap-7'>
          <button className='text-2xl rounded-full bg-primary hover:bg-primary/90 text-secondary px-10 py-3'>
            Get started
          </button>
          <div className='flex flex-row items-center gap-3 font-semibold'>
            <a
              href='/'
              className='flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-secondary text-2xl p-3'
            >
              <FaPlay className='text-white' />
            </a>
            See how it works?
          </div>
        </div>
      </div>

      <div className='w-[40%] bg-secondary flex items-center justify-center '>
        <div className='mt-16'>
          <img src='/landing.png' />
        </div>
      </div>
    </div>
  );
}
