'use client';
import { ALL_COURSES } from '@/app/constants';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CourseCardProps } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

function CourseCard({
  id,
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
      className='w-full overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer'
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
        <h3 className='font-semibold text-lg leading-none tracking-tight'>
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
  return (
    <div className='bg-secondary min-h-screen px-10 lg:px-16 xl:px-28 pt-28 w-full mx-auto flex flex-col'>
      <div className='flex flex-col justify-center items-center gap-10 w-full'>
        <div className='flex flex-col md:flex-row justify-start md:justify-between w-full md:items-end gap-3 md:gap-0'>
          <div>
            <h2 className='font-semibold text-3xl md:text-5xl text-primary'>
              All Courses
            </h2>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
              Navigate through the courses you might want to learn.
            </p>
          </div>
          <div className='w-full md:w-auto'>
            <Select defaultValue='popular'>
              <SelectTrigger className='w-full md:w-[200px] bg-secondary border-primary/90'>
                <SelectValue placeholder='Sort by Most Popular' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value='popular'
                    className='data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary'
                  >
                    Most Popular
                  </SelectItem>
                  <SelectItem
                    value='rated'
                    className='data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary'
                  >
                    Highest Rated
                  </SelectItem>
                  <SelectItem
                    value='recent'
                    className='data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary'
                  >
                    Recently Uploaded
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid Layout for Course Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
          {ALL_COURSES.map((course: CourseCardProps) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
