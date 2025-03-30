import { VISITORS_ANALYTICS } from '@/app/constants';
import { VisitorAnalyticsProps } from '@/lib/definitions';

export function VisitorsAnalytics() {
  return (
    <div className='w-full h-fit bg-primary dark:bg-black'>
      <div className='flex flex-col md:grid md:grid-cols-3 gap-4 w-full h-full py-7'>
        {VISITORS_ANALYTICS.map((item: VisitorAnalyticsProps, index) => (
          <div
            key={item.id}
            className={`p-4 flex flex-col md:flex-row justify-center items-center gap-3 text-center md:text-left ${
              index !== VISITORS_ANALYTICS.length - 1
                ? 'md:border-r border-secondary/50'
                : ''
            }`}
          >
            {/* Smaller image for md and below */}
            <img src={item.imgSrc} className='h-20 md:h-24 lg:h-28' />

            <div className='flex flex-col justify-center items-center md:items-start'>
              {/* Smaller text on md and below */}
              <p className='font-bold text-4xl lg:text-6xl text-secondary dark:text-primary'>
                {item.value}
              </p>
              <p className='font-medium text-base lg:text-lg text-secondary dark:text-primary leading-tight'>
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
