import { VISITORS_ANALYTICS } from '@/app/constants';
import { VisitorAnalyticsProps } from '@/lib/definitions';

export function VisitorsAnalytics() {
  return (
    <div className='w-full h-fit bg-primary'>
      <div className='grid grid-cols-3 gap-4 w-full h-full py-7'>
        {VISITORS_ANALYTICS.map((item: VisitorAnalyticsProps, index) => (
          <div
            key={item.id}
            className={`p-4 flex flex-row justify-center items-center gap-3 ${
              index !== VISITORS_ANALYTICS.length - 1
                ? 'border-r border-secondary/50'
                : ''
            }`}
          >
            <img src={item.imgSrc} className='h-28' />
            <div className='flex flex-col justify-center items-start'>
              <p className='font-bold text-6xl text-secondary'>{item.value}</p>
              <p className='font-medium text-lg text-secondary'>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
