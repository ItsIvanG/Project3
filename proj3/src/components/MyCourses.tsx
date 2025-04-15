'use client';
import { EnrolledCourse } from '@/lib/definitions';
import RecentlyEnrolledCourses from './RecentlyEnrolledCourses';
import { ReusableSelect } from './ui/select';
import { useMemo, useState } from 'react';
import { RecentlyEnrolledCourse } from '@/app/constants';
import { FiSearch } from 'react-icons/fi';
import { Input } from './ui/input';

export function MyCourses() {
  const [recentlyEnrolled, setData] = useState<EnrolledCourse[]>(
    RecentlyEnrolledCourse
  );
  //api call

  const [generalFilter, setGeneralFilter] = useState<
    'all' | 'notyetstarted' | 'inprogress' | 'completed'
  >('all');

  const [searchFilter, setSearchFilter] = useState<string>('');

  const generalFilteredCourses = useMemo(() => {
    let baseFiles: EnrolledCourse[] = [];
    if (generalFilter === 'all') {
      baseFiles = recentlyEnrolled;
    }

    if (generalFilter === 'notyetstarted') {
      const formattedCourses = recentlyEnrolled.filter(
        (course) => course.finishedPercentage === 0
      );
      baseFiles = formattedCourses;
    }

    if (generalFilter === 'inprogress') {
      const formattedCourses = recentlyEnrolled.filter(
        (course) =>
          course.finishedPercentage > 0 && course.finishedPercentage < 100
      );
      baseFiles = formattedCourses;
    }

    if (generalFilter === 'completed') {
      const formattedCourses = recentlyEnrolled.filter(
        (course) => course.finishedPercentage === 100
      );
      baseFiles = formattedCourses;
    }

    if (searchFilter) {
      baseFiles = baseFiles.filter((course) =>
        Object.values(course).some((value) =>
          String(value).toLowerCase().includes(searchFilter!.toLowerCase())
        )
      );
    }
    return baseFiles;
  }, [generalFilter, recentlyEnrolled, searchFilter]);

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
        <div className='flex flex-col lg:flex-row justify-between w-full lg:items-end gap-3 mb-5'>
          <div>
            <h2 className='font-bold text-3xl md:text-5xl text-primary'>
              My Courses
            </h2>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
              Navigate through the courses you are currently enrolled in.
            </p>
          </div>
          <div className='w-full lg:w-auto flex flex-col lg:flex-row justify-end gap-3'>
            {/* Search Bar */}
            <div className='relative flex items-center'>
              <div className='absolute left-3 bg-primary rounded-full p-1 flex items-center justify-center z-10'>
                <FiSearch className='text-secondary text-lg' />
              </div>
              <Input
                type='text'
                value={searchFilter}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setSearchFilter(value);
                }}
                placeholder='Search'
                className='pl-12 rounded-full bg-secondary border border-primary text-primary'
              />
            </div>
            <ReusableSelect
              items={[
                {
                  name: 'All',
                  action: () => {
                    setGeneralFilter('all');
                  },
                },
                {
                  name: 'Not yet started',
                  action: () => {
                    setGeneralFilter('notyetstarted');
                  },
                },
                {
                  name: 'In progress',
                  action: () => {
                    setGeneralFilter('inprogress');
                  },
                },
                {
                  name: 'Completed',
                  action: () => {
                    setGeneralFilter('completed');
                  },
                },
              ]}
            />
          </div>
        </div>

        {/* Grid Layout for Course Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
          {generalFilteredCourses.map((mycourse: EnrolledCourse, index) => (
            <RecentlyEnrolledCourses key={index} courses={{ ...mycourse }} />
          ))}
        </div>
      </div>
    </div>
  );
}
