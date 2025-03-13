'use client';
import { ALL_COURSES } from '@/app/constants';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CourseCardProps } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
'use client';
import { ALL_COURSES } from '@/app/constants';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CourseCardProps } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import {
  ReusableSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
} from './ui/select';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import React from 'react';
import { VisitorsMotto } from './VisitorsMotto';
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import React from 'react';
import { VisitorsMotto } from './VisitorsMotto';

function CourseCard({
  id,
  author,
  author,
  title,
  rating,
  totalRatings,
  lessons,
  students,
  imgSrc,
}: CourseCardProps) {
  const router = useRouter();

  const redirect = (id: string) => {
    router.push(`/courses/${id}/view`);
  };
  return (
    <Card
      className='w-full group hover:shadow-lg cursor-pointer transition-transform hover:scale-105 overflow-hidden duration-300 ease-in-out'
      className='w-full group hover:shadow-lg cursor-pointer transition-transform hover:scale-105 overflow-hidden duration-300 ease-in-out'
      onClick={() => redirect(id)}
    >
      <div className='relative h-40 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden'>
      <div className='relative h-40 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden'>
        {imgSrc ? (
          <img
            src={imgSrc || '/placeholder.svg'}
            src={imgSrc || '/placeholder.svg'}
            alt={title}
            className='w-full h-full object-cover'
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='absolute inset-0 opacity-30'>
            <div className='absolute inset-0 grid grid-cols-6 gap-2 p-4 transform -skew-y-12'>
          <div className='absolute inset-0 opacity-30'>
            <div className='absolute inset-0 grid grid-cols-6 gap-2 p-4 transform -skew-y-12'>
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-secondary/20 rounded-sm h-8 backdrop-blur-sm'
                  className='bg-secondary/20 rounded-sm h-8 backdrop-blur-sm'
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <CardHeader className='pb-3'>
        <p className='text-xs text-muted-foreground'>A course by {author}</p>
        <h3 className='font-semibold text-lg leading-none tracking-tight'>
      <CardHeader className='pb-3'>
        <p className='text-xs text-muted-foreground'>A course by {author}</p>
        <h3 className='font-semibold text-lg leading-none tracking-tight'>
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-1'>
        <div className='flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    ? 'fill-yellow-400 text-yellow-400'
                    : i < rating
                    ? 'fill-none text-yellow-400'
                    : 'fill-yellow-400 text-yellow-400'
                    ? 'fill-none text-yellow-400'
                    : 'fill-yellow-400 text-yellow-400'
                }`}
              />
            ))}
            <span className='text-primary/50 ml-1'>({totalRatings})</span>
            <span className='text-primary/50 ml-1'>({totalRatings})</span>
          </div>
        </div>
        <div className='flex items-center gap-4 mt-4 text-sm text-primary/50'>
          <div className='flex items-center gap-1'>
            <MonitorPlay className='w-4 h-4' />
        <div className='flex items-center gap-4 mt-4 text-sm text-primary/50'>
          <div className='flex items-center gap-1'>
            <MonitorPlay className='w-4 h-4' />
            <span>{lessons}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Users className='w-4 h-4' />
          <div className='flex items-center gap-1'>
            <Users className='w-4 h-4' />
            <span>{students}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AllCourses() {
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
        <div className='flex flex-col md:flex-row justify-start md:justify-between w-full md:items-end gap-3 md:gap-0'>
          <div>
            <h2 className='font-bold text-3xl md:text-5xl text-primary'>
            <h2 className='font-bold text-3xl md:text-5xl text-primary'>
              All Courses
            </h2>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
              Navigate through the courses you might want to learn.
            </p>
          </div>
          <div className='flex flex-col lg:flex-row gap-3'>
            <div className='w-full md:w-auto'>
          <div className='flex flex-col lg:flex-row gap-3'>
            <div className='w-full md:w-auto'>
              <ReusableSelect
                items={[
                  {
                    name: 'All Categories',
                    name: 'All Categories',
                    action: () => {},
                  },
                  {
                    name: 'Web Development',
                    name: 'Web Development',
                    action: () => {},
                  },
                  {
                    name: 'Business',
                    name: 'Business',
                    action: () => {},
                  },
                  {
                    name: 'Machine Learning',
                    name: 'Machine Learning',
                    action: () => {},
                  },
                  {
                    name: 'Data Science',
                    name: 'Data Science',
                    action: () => {},
                  },
                  {
                    name: 'Cybersecurity',
                    name: 'Cybersecurity',
                    action: () => {},
                  },
                ]}
              />
            </div>
            <div className='w-full md:w-auto'>
            <div className='w-full md:w-auto'>
              <ReusableSelect
                items={[
                  {
                    name: 'All Courses',
                    name: 'All Courses',
                    action: () => {},
                  },
                  {
                    name: 'Most Popular',
                    name: 'Most Popular',
                    action: () => {},
                  },
                  {
                    name: 'Highest Rated',
                    name: 'Highest Rated',
                    action: () => {},
                  },
                  {
                    name: 'Recently Uploaded',
                    name: 'Recently Uploaded',
                    action: () => {},
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Grid Layout for Course Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
          {ALL_COURSES.map((course: CourseCardProps) => (
            <div
              key={course.id}
              className='transition-transform duration-300 hover:scale-x-100'
              className='transition-transform duration-300 hover:scale-x-100'
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
