export function VisitorPricing() {
  return (
    <div className='w-full h-fit px-14 lg:px-28 py-20 lg:py-10 flex flex-row bg-secondary justify-center items-center'>
      <div className='w-full lg:w-[50%] flex flex-col items-start justify-center gap-12'>
        <div>
          <p className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary'>
            Straightforward pricing
          </p>
          <p className='font-medium text-primary text-base xl:text-lg leading-tight mt-6'>
            Our pricing plans provide everything you need to start teaching and
            earning right away. Upgrade anytime to access more resources as your
            business grows and evolves.
          </p>
        </div>

        <div>
          <a
            className='text-base md:text-xl rounded-full bg-primary hover:bg-primary/90 text-secondary px-10 py-3'
            href=''
          >
            Explore all plans
          </a>
        </div>
      </div>

      <div className='hidden lg:w-[50%] lg:flex items-center justify-center'>
        <div>
          <img src='/pricingpic.png' className='hidden lg:flex' />
        </div>
      </div>
    </div>
  );
}
