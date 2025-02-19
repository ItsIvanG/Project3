export function VisitorsMotto() {
  return (
    <div className='w-full h-fit bg-primary p-14 flex justify-center items-center'>
      <div className='w-full h-full flex-col flex justify-center items-center gap-10'>
        <div>
          <p className='font-extrabold text-7xl text-secondary'>
            LEARN. MANAGE. GROW.
          </p>
        </div>
        <div>
          <a
            href='/login'
            className='text-2xl rounded-full bg-secondary hover:bg-secondary/90 text-primary px-10 py-3'
          >
            Start Now
          </a>
        </div>
      </div>
    </div>
  );
}
