'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FEATURES } from '@/app/constants';

export function VisitorsQualities() {
  return (
    <div className='bg-secondary min-h-screen px-10 md:px-24 py-20 w-full justify-center items-center'>
      <div className='w-full flex flex-col lg:flex-row gap-20 lg:gap-10'>
        {/* Header Section */}
        <div className='space-y-10 w-full lg:w-[40%] text-center lg:text-start justify-center items-center lg:items-start flex flex-col'>
          <div className='space-y-5'>
            <h2 className='font-bold tracking-tighter text-3xl md:text-5xl text-primary'>
              Why we are best from others?
            </h2>
            <p className='text-primary text-base xl:text-lg'>
              We offer more than just courses—we provide a{' '}
              <span className='font-semibold'>hands-on, community-driven</span>{' '}
              learning experience to help you grow and succeed in business.
            </p>
          </div>

          <div>
            <a
              href='/login'
              className='text-base md:text-xl rounded-full bg-primary hover:bg-primary/90 text-secondary px-10 py-3'
            >
              Start now
            </a>
          </div>
        </div>

        {/* Features */}
        <div className='w-full lg:w-[60%] flex flex-col gap-4'>
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.id} className='shadow-sm'>
                <CardContent className='p-6 space-y-4'>
                  <div className='flex flex-row justify-start items-center gap-5'>
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.iconBgColor} flex items-center justify-center aspect-square`}
                    >
                      <IconComponent className='w-6 h-6 text-secondary' />
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold'>{feature.title}</h3>
                      <p className='text-primary leading-tight'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
