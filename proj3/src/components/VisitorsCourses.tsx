'use client';
import { VISITORS_COURSES, POPULAR_COURSES } from '@/app/constants';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { VisitorCourse, CourseCardProps } from '@/lib/definitions';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export function VisitorsCourses() {
  return (
    <section
      id='visitor_courses'
      className='bg-secondary min-h-screen py-16 px-4 md:p-28 w-full'
    >
      <div className='mx-auto flex flex-col gap-32'>
        <div className='flex flex-col justify-center items-center gap-7'>
          <div className='text-center w-full mx-auto'>
            <p className='font-semibold text-3xl md:text-5xl text-primary'>
              Expert-level training, available at a fraction of the price.
            </p>
          </div>

          <div className='border-2 border-primary/50 py-8 px-4 md:px-10 w-full rounded-2xl'>
            <div className='text-center mb-8'>
              <p className='font-medium text-xl md:text-2xl text-primary'>
                Explore courses by job function
              </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-8 '>
              {VISITORS_COURSES.map((course: VisitorCourse) => (
                <Card
                  key={course.id}
                  className='hover:shadow-lg transition-shadow'
                >
                  <CardContent className='flex flex-col items-center justify-center p-4 h-40'>
                    <img
                      src={course.imgSrc || '/placeholder.svg'}
                      alt={course.label}
                      className='h-20 w-full object-contain'
                    />
                    <p className='text-sm md:text-md font-semibold text-center mt-4 leading-tight'>
                      {course.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-5'>
          <div className='text-center w-full'>
            <h2 className='font-semibold text-3xl md:text-5xl text-primary mb-3'>
              Our Most Popular Courses
            </h2>
            <p className='font-medium text-base md:text-lg lg:text-2xl text-primary'>
              Get the best course with the best price with world-class tutors.
            </p>
          </div>

          <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex justify-end items-center p-3'>
              <Link
                href='/courses'
                className='font-semibold text-primary text-md hover:underline'
              >
                See all courses
              </Link>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className='w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-full'
            >
              <CarouselContent className='-ml-4 flex '>
                {POPULAR_COURSES.map((course: CourseCardProps) => (
                  <CarouselItem
                    key={course.id}
                    className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2'
                  >
                    <div className='p-1'>
                      <CourseCard {...course} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className='hidden md:flex'>
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
