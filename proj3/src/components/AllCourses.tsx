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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import React, { useEffect, useMemo, useState } from 'react';
import { VisitorsMotto } from './VisitorsMotto';
import { FiSearch } from 'react-icons/fi';
import { Input } from './ui/input';

function CourseCard({
  id,
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
      onClick={() => redirect(id)}
    >
      <div className='relative h-40 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden'>
        {imgSrc ? (
          <img
            src={imgSrc || '/placeholder.svg'}
            alt={title}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='absolute inset-0 opacity-30'>
            <div className='absolute inset-0 grid grid-cols-6 gap-2 p-4 transform -skew-y-12'>
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-secondary/20 rounded-sm h-8 backdrop-blur-sm'
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <CardHeader className='pb-3'>
        <p className='text-xs text-muted-foreground'>A course by {author}</p>
        <h3 className='font-semibold text-lg leading-none tracking-tight line-clamp-1'>
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : i < rating
                    ? 'fill-none text-yellow-400'
                    : 'fill-yellow-400 text-yellow-400'
                }`}
              />
            ))}
            <span className='text-primary/50 ml-1'>({totalRatings})</span>
          </div>
        </div>
        <div className='flex items-center gap-4 mt-4 text-sm text-primary/50'>
          <div className='flex items-center gap-1'>
            <MonitorPlay className='w-4 h-4' />
            <span>{lessons}</span>
          </div>
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
  const [ALL_COURSES, setAllCourses] = useState<CourseCardProps[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/init/courses/get',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ get_all_courses: true }),
          }
        );
        const data = await response.json();

        if (data.statusCode === 200) {
          const courses = JSON.parse(data.body).courses.map((course: any) => ({
            id: course.course_id.toString(),
            author: `${course.instructor_name}`,
            title: course.course_name,
            rating: parseFloat(course.course_average_rating),
            totalRatings: course.course_rating_count,
            lessons: course.course_estimated_time,
            students: Math.floor(Math.random() * 1000) + 1, // Placeholder
            imgSrc: course.thumbnail || 'default-image-url.jpg',
          }));

          setAllCourses(courses);
        } else {
          console.error('Failed to fetch courses:', data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const [generalFilter, setGeneralFilter] = useState<
    'allcourses' | 'mostpopular' | 'highestrating'
  >('allcourses');

  const [searchFilter, setSearchFilter] = useState<string>('');

  const generalFilteredCourses = useMemo(() => {
    let baseFiles: CourseCardProps[] = [];
    if (generalFilter === 'allcourses') {
      baseFiles = ALL_COURSES;
    }

    if (generalFilter === 'mostpopular') {
      const sortedCourses = [...ALL_COURSES].sort((a, b) => {
        return b.students - a.students;
      });
      baseFiles = sortedCourses;
    }

    if (generalFilter === 'highestrating') {
      const sortedCourses = [...ALL_COURSES].sort((a, b) => {
        return b.rating - a.rating;
      });
      baseFiles = sortedCourses;
    }

    if (searchFilter) {
      baseFiles = baseFiles.filter((course) =>
        Object.values(course).some((value) =>
          String(value).toLowerCase().includes(searchFilter!.toLowerCase())
        )
      );
    }
    return baseFiles;
  }, [generalFilter, ALL_COURSES, searchFilter]);

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
              All Courses
            </h2>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
              Navigate through the courses you might want to learn.
            </p>
          </div>

          <div className='flex flex-col lg:flex-row gap-3'>
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
              items={['All Courses', 'Most Popular', 'Highest Rated'].map(
                (name) => ({
                  name,
                  action: () => {
                    if (name === 'All Courses') {
                      setGeneralFilter('allcourses');
                    }
                    if (name === 'Most Popular') {
                      setGeneralFilter('mostpopular');
                    }
                    if (name === 'Highest Rated') {
                      setGeneralFilter('highestrating');
                    }
                  },
                })
              )}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
        {generalFilteredCourses.map((course: CourseCardProps) => (
          <div
            key={course.id}
            className='transition-transform duration-300 hover:scale-x-100'
          >
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
}
