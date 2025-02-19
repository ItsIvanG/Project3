export function VisitorsAbout() {
  return (
    <section
      id='about'
      className='bg-secondary h-fit p-20 w-full flex items-center justify-center'
    >
      <div className='w-full flex flex-row items-center justify-center'>
        <div className='w-[45%] flex items-center justify-center '>
          <div className='w-full max-w-md flex items-center justify-center'>
            <img src='/aboutpic.png' className='w-full h-auto' />
          </div>
        </div>

        <div className='w-[60%] flex flex-col items-center justify-center gap-14'>
          <div className=''>
            <p className='font-extrabold text-primary text-5xl'>
              The Keystone Business Builders Difference
            </p>
          </div>
          <div className='flex flex-col gap-10'>
            <div className=''>
              <p className='font-semibold text-3xl'>
                Prove Mastery Through Hands-On Projects
              </p>
              <p className='font-normal text-primary text-lg leading-tight mt-4 text-justify'>
                Learn by doing. Our eLearning platform offers real-world
                projects, simulations, and case studies to help you apply skills
                with confidence. Join a community-driven space where
                collaboration and mentorship fuel your growth. Build, innovate,
                and excel!
              </p>
            </div>
            <div className=''>
              <p className='font-semibold text-3xl'>
                Experience-Driven Learning for Real-World Success
              </p>
              <p className='font-normal text-primary text-lg leading-tight mt-4 text-justify'>
                Go beyond theory with hands-on projects, real-world
                applications, and expert guidance. Learn, build, and grow in a
                collaborative community designed for success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
