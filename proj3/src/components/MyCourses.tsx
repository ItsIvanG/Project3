'use client';
import { EnrolledCourse } from '@/lib/definitions';
import RecentlyEnrolledCourses from './RecentlyEnrolledCourses';
import { ReusableSelect } from './ui/select';
import { useState } from 'react';
import { RecentlyEnrolledCourse } from '@/app/constants';

export function MyCourses() {
  const [data, setData] = useState<EnrolledCourse[]>(RecentlyEnrolledCourse);
  //api call

  return (
    <div className='bg-secondary px-10 lg:px-16 xl:px-28 py-32 mx-auto flex flex-col'>
      <div className='flex flex-col justify-center items-center gap-10 w-full'>
        <div className='w-full h-fit bg-primary dark:bg-black p-10 md:p-14 flex justify-center items-center'>
          <div className='w-full h-full flex-col flex text-center justify-center items-center gap-10'>
            <div>
              <p className='font-extrabold text-4xl lg:text-7xl text-secondary dark:text-primary'>
                LEARN. MANAGE. GROW.
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-start md:justify-between w-full md:items-end gap-3 md:gap-0'>
          <div>
            <h2 className='font-bold text-3xl md:text-5xl text-primary'>
              My Courses
            </h2>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
              Navigate through the courses you are currently enrolled in.
            </p>
          </div>
          <div className='flex flex-col lg:flex-row gap-3'>
            <div className='w-full md:w-auto'>
              <ReusableSelect
                items={[
                  {
                    name: 'All',
                    action: () => {},
                  },
                  {
                    name: 'Not yet started',
                    action: () => {},
                  },
                  {
                    name: 'In progress',
                    action: () => {},
                  },
                  {
                    name: 'Completed',
                    action: () => {},
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Grid Layout for Course Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
          {data.map((mycourse: EnrolledCourse, index) => (
            <RecentlyEnrolledCourses key={index} courses={{ ...mycourse }} />
          ))}
        </div>
      </div>
    </div>
  );
}
