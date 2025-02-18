export function VisitorPricing() {
  return (
    <div className='w-full h-screen flex flex-row px-32 bg-secondary'>
      <div className='w-[50%] flex flex-col items-start justify-center gap-12'>
        <div>
          <p className='font-extrabold text-primary text-6xl'>
            Straightforward pricing
          </p>
          <p className='font-medium text-primary text-lg leading-tight mt-6'>
            Our pricing plans provide everything you need to start teaching and
            earning right away. Upgrade anytime to access more resources as your
            business grows and evolves.
          </p>
        </div>

        <div>
          <a
            className='text-xl rounded-full bg-primary hover:bg-primary/90 text-secondary px-10 py-3'
            href=''
          >
            Explore all plans
          </a>
        </div>
      </div>

      <div className='w-[50%] flex items-center justify-center'>
        <div>
          <img src='/pricingpic.png' />
        </div>
      </div>
    </div>
  );
}
