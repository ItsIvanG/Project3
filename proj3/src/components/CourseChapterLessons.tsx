import { courseChapterContent } from '@/app/constants';
import { CourseChapterContent } from '@/lib/definitions';
import { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

export default function CourseChapterLessons() {
  const [data, setData] = useState<CourseChapterContent>(courseChapterContent);
  //api

  const { heading, contents } = data;

  return (
    <div className='w-full flex flex-col bg-card'>
      {/* course heading */}
      <div className='relative h-[200px] md:h-[300px] lg:h-[400px] w-full'>
        <img
          src={heading.imgSrc || '/course1.jpeg'}
          className='w-full h-full object-cover'
        />
        <div className='w-full absolute bottom-0 left-0 bg-primary/50 dark:bg-secondary/55 py-2 px-5 sm:py-3 lg:py-5 lg:px-10 flex flex-col gap-1 md:gap-4'>
          <span className='font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-secondary dark:text-primary'>
            {heading.chapterTitle}
          </span>
          <span className='text-xs text-secondary dark:text-primary flex flex-row items-center gap-2'>
            Scroll to begin{' '}
            <IoIosArrowDropdownCircle className='text-secondary/50 dark:text-primary/50' />
          </span>
        </div>
      </div>

      {/* course content */}
      <div className='w-full flex flex-col bg-card p-5 sm:p-10 gap-16 shadow'>
        {data.contents?.map((content, index) => {
          return (
            <div key={index} className='w-full flex flex-col'>
              <span className='text-primary text-lg md:text-2xl font-semibold'>
                {content.subChaptertitle}
              </span>
              <span className='text-primary text-sm md:text-base py-5 md:p-5 lg:p-10 leading-relaxed text-justify'>
                {content.subChaptercontent}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
