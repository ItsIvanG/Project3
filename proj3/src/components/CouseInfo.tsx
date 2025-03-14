'use client';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';
import type { CourseInclusion, CourseInfoProps } from '@/lib/definitions';
import { CourseInfos } from '@/app/constants';
import { Button } from './ui/button';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import CourseResource from './CourseResource';
import CourseInfosCard from './CourseInfosCard';

// Updated CourseIncludes to properly render icons as components
function CourseIncludes({ icon: IconComponent, inclusion }: CourseInclusion) {
  return (
    <div className='ml-4 flex flex-row mb-2 items-center'>
      <div className='mr-4 text-primary'>
        <IconComponent className='w-6 h-6' />
      </div>
      <span className='text-xs sm:text-sm md:text-base lg:text-lg'>
        {inclusion}
      </span>
    </div>
  );
}

export default function CourseInfo() {
  const [data, setData] = useState<CourseInfoProps>(CourseInfos);
  // API call here

  // Destructure data
  const { courseInfoHeader, courseIncludes, courseResources, expOutcomes } =
    data;

  return (
    <div className='bg-secondary px-4 md:px-10 lg:px-16 xl:px-28 py-32 w-full mx-auto flex flex-col gap-10'>
      <CourseInfosCard
        id={courseInfoHeader.id}
        title={courseInfoHeader.title}
        rating={courseInfoHeader.rating}
        totalRatings={courseInfoHeader.totalRatings}
        lessons={courseInfoHeader.lessons}
        students={courseInfoHeader.students}
        category={courseInfoHeader.category}
        price={courseInfoHeader.price}
        description={courseInfoHeader.description}
        instructor={courseInfoHeader.instructor}
        isOngoing={false} // Change this based on the actual course status
        createdAt={''}
      />
      <div className='w-full'>
        <p className='font-bold text-xl md:text-3xl text-primary mb-5'>
          Expected Outcomes:
        </p>
        {expOutcomes.map((outcome, index) => (
          <div key={index} className='ml-4'>
            •{' '}
            <span className='ml-2 text-xs sm:text-sm md:text-base lg:text-lg'>
              {outcome}
            </span>
          </div>
        ))}
      </div>
      <div className='w-full'>
        <p className='font-bold text-xl md:text-3xl text-primary mb-5'>
          Course Includes
        </p>
        <div className='w-full grid grid-cols-1 md:grid-cols-2'>
          {courseIncludes.map(({ icon, inclusion }, index) => (
            <CourseIncludes key={index} icon={icon} inclusion={inclusion} />
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col'>
        <p className='font-bold text-xl md:text-3xl text-primary mb-5'>
          Resources
        </p>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
          {courseResources.map(({ title, createdAt, type }, index) => (
            <CourseResource
              key={index}
              title={title}
              createdAt={createdAt}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
