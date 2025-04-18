export function VisitorsMotto() {
  return (
    <div className='w-full h-fit bg-primary dark:bg-black p-10 md:p-14 flex justify-center items-center'>
      <div className='w-full h-full flex-col flex text-center justify-center items-center gap-10'>
        <div>
          <p className='font-extrabold text-4xl lg:text-7xl text-secondary dark:text-primary'>
            LEARN. MANAGE. GROW.
          </p>
        </div>
        <div>
          <a
            href='/login'
            className='text-base md:text-xl rounded-full bg-secondary hover:bg-secondary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary dark:text-secondary px-10 py-3'
          >
            Start Now
          </a>
        </div>
      </div>
    </div>
  );
}
