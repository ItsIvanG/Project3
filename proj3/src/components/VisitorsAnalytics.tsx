export function VisitorsAnalytics() {
  return (
    <div className='w-full h-fit bg-primary'>
      <div className='grid grid-cols-3 gap-4 w-full h-full py-7'>
        <div className='p-4 flex flex-row justify-center items-center gap-3 border-r border-secondary/50'>
          <img src='/book.png' className='h-28' />
          <div className='flex flex-col justify-center items-start'>
            <p className='font-bold text-6xl text-secondary'>XX+</p>
            <p className='font-medium text-lg text-secondary'>
              students engaged
            </p>
          </div>
        </div>
        <div className='p-4 flex flex-row justify-center items-center gap-3 border-r border-secondary/50'>
          <img src='/mentor.png' className='h-32' />
          <div className='flex flex-col justify-center items-start'>
            <p className='font-bold text-6xl text-secondary'>XX+</p>
            <p className='font-medium text-lg text-secondary'>expert mentors</p>
          </div>
        </div>
        <div className='p-4 flex flex-row justify-center items-center gap-3'>
          <img src='/phone.png' className='h-28' />
          <div className='flex flex-col justify-center items-start'>
            <p className='font-bold text-6xl text-secondary'>XX+</p>
            <p className='font-medium text-lg text-secondary'>
              for student mobile app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
