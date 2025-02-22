'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FaQuoteLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { TESTIMONIALS } from '@/app/constants';
import type { Testimonial } from '@/lib/definitions';

export function VisitorsTestimonials() {
  return (
    <div className='w-full px-16 sm:px-24 py-10 sm:py-20 h-fit lg:min-h-screen flex justify-center items-center bg-secondary'>
      <div className='flex flex-col justify-center items-center gap-10 sm:gap-16 w-full h-full'>
        <h2 className='text-center text-4xl sm:text-5xl font-semibold'>
          Taught By The Best
        </h2>

        <Carousel
          opts={{
            loop: false,
          }}
          className='w-full relative h-full bg-secondary'
        >
          <CarouselContent className='h-full w-full '>
            {TESTIMONIALS.map((testimonial: Testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className='flex justify-center items-center w-full h-full'
              >
                <div className='flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-20 w-full h-full'>
                  {/* Profile Image on the Left */}

                  <div className='h-[100px] w-[100px] sm:h-[180px] sm:w-[180px] lg:h-[400px] lg:w-[400px] rounded-full overflow-hidden'>
                    <img
                      src={testimonial.image || '/placeholder.svg'}
                      alt={testimonial.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Testimonial Content on the Right */}
                  <div className='w-full lg:w-[60%] space-y-4 text-center lg:text-left'>
                    <FaQuoteLeft className='w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 text-primary' />
                    <blockquote className='text-base sm:text-xl xl:text-3xl leading-tight sm:leading-relaxed text-primary'>
                      {testimonial.quote}
                    </blockquote>
                    <div className=''>
                      <p className='font-semibold text-base sm:text-lg text-primary/50'>
                        {testimonial.name}
                      </p>
                      <p className='text-primary/50 text-xs sm:text-md'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons Only */}
          <div className='flex items-center justify-center gap-4 mt-12'>
            <CarouselPrevious className='text-primary' />
            <CarouselNext className='text-primary' />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
