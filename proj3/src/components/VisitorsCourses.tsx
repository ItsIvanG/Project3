export function VisitorsCourses() {
  return (
    <div className='w-full h-fit bg-secondary flex flex-col p-20'>
      <div className='flex flex-col justify-center items-center gap-7'>
        <p className='font-semibold text-5xl text-primary'>
          Expert-level training, available at a fraction of the price.
        </p>
        <div className='flex flex-col border-2 border-primary/50 py-10 w-full justify-center items-center gap-3 rounded-2xl'>
          <p className='font-semibold text-2xl text-primary'>
            Explore courses by job function
          </p>
          <div className='grid grid-cols-6 gap-8 w-full h-full justify-center items-center'>
            <div className='bg-primary/5 rounded-2xl shadow-md flex flex-col p-6 gap-2 justify-center items-center'>
              <img src='/datasci.png' className='h-24 w-full object-contain' />
              <p className='text-md font-semibold'>Data Science</p>
            </div>
            <div className='bg-primary/5 rounded-2xl shadow-md flex flex-col p-6 gap-2 justify-center items-center'>
              <img src='/prog.png' className='h-24 w-full object-contain' />
              <p className='text-md font-semibold'>Programming & Development</p>
            </div>
            <div className='bg-primary/5 rounded-2xl shadow-md flex flex-col p-6 gap-2 justify-center items-center'>
              <img src='/ai.png' className='h-24 w-full object-contain' />
              <p className='text-md font-semibold'>Artificial Intelligence</p>
            </div>
            <div className='bg-primary/5 rounded-2xl shadow-md flex flex-col p-6 gap-2 justify-center items-center'>
              <img src='/business.png' className='h-24 w-full object-contain' />
              <p className='text-md font-semibold'>Business</p>
            </div>
            <div className='bg-primary/5 rounded-2xl shadow-md flex flex-col p-6 gap-2 justify-center items-center'>
              <img src='/prod.png' className='h-24 w-full object-contain' />
              <p className='text-md font-semibold'>Product Management</p>
            </div>
            <div className='bg-primary/5 rounded-2xl shadow-md flex flex-col p-6 gap-2 justify-center items-center'>
              <img src='/cloud.png' className='h-24 w-full object-contain' />
              <p className='text-md font-semibold'>Cloud Computing</p>
            </div>
          </div>
        </div>
      </div>

      <div className=''></div>
    </div>
  );
}
