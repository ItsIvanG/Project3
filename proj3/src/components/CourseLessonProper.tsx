//holds both right and left content
'use client';
import { courseNavigation } from '@/app/constants';
import CourseNavAccordion from './CourseNavAccordion';
import { useState } from 'react';
import { CourseNavigation } from '@/lib/definitions';
import CourseChapterLessons from './CourseChapterLessons';

export default function CourseLessonProper() {
  const [data, setData] = useState<CourseNavigation>(courseNavigation);
  //api

  const { courseTitle, courseChapters } = data;
  return (
    <div className='bg-secondary px-4 md:px-10 xl:px-20 w-full mx-auto flex flex-col'>
      <div className='w-full bg-primary h-10 rounded-t-lg flex items-center px-5'>
        <h2 className='font-bold text-base md:text-xl text-secondary'>
          {courseTitle}
        </h2>
      </div>
      <div className='w-full h-fit flex flex-col lg:flex-row gap-10 lg:gap-0'>
        <div className='w-full lg:w-3/4'>
          <CourseChapterLessons />
        </div>
        <div className='w-full lg:w-1/4 h-fit flex flex-col'>
          <div className='w-full bg-primary h-10 flex lg:hidden items-center px-5'>
            <p className='text-base font-semibold text-secondary'>
              Course Progress
            </p>
          </div>
          <CourseNavAccordion courseChapters={courseChapters} />
        </div>
      </div>
    </div>
  );
}
