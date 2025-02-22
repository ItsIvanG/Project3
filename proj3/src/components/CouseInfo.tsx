//make another props for course info and include category to it
//add another button for filter by categories
//add to sorting: all courses

import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CourseInfoProps } from '@/lib/definitions';
import { CourseInfos } from '@/app/constants';
import { Button } from './ui/button';

function CourseInfosCard({
  id,
  title,
  rating,
  totalRatings,
  lessons,
  students,
  imgSrc,
  category,
  price,
  description,
}: CourseInfoProps) {
  return (
    <Card className='w-full overflow-hidden h-fit lg:h-1/2'>
      <div className='w-full h-full flex flex-col lg:flex-row'>
        {/* Course Image */}
        <div className='relative w-full lg:h-full lg:w-1/2  overflow-hidden'>
          <img
            src={imgSrc || '/course1.jpeg'}
            alt={title}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Course Details */}
        <div className='p-4 sm:p-3 md:p-6 w-full h-fit lg:h-full lg:w-1/2 '>
          <h3 className='text-lg sm:text-base md:text-xl xl:text-3xl font-bold text-primary md:mb-3'>
            {title}
          </h3>

          {/* Categories */}
          <div className='flex flex-wrap gap-1 mt-1 sm:mt-2 md:mb-3'>
            {category.map((cat) => (
              <Badge
                key={cat}
                variant='secondary'
                className='rounded-full text-xs sm:text-[10px] md:text-sm'
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className='mt-2 text-muted-foreground text-xs sm:text-sm md:text-base line-clamp-2 md:mb-3'>
            {description}
          </p>

          {/* Rating */}
          <div className='mt-2 flex items-center gap-1 sm:gap-2 md:mb-3'>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    star <= Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : star <= rating
                      ? 'fill-yellow-400/50 text-yellow-400'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className='text-muted-foreground text-xs sm:text-sm '>
              ({totalRatings})
            </span>
          </div>

          {/* Course Stats */}
          <div className='mt-2 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <MonitorPlay className='w-3 h-3 sm:w-4 sm:h-4' />
              <span>{lessons} lessons</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='w-3 h-3 sm:w-4 sm:h-4' />
              <span>{students} students</span>
            </div>
          </div>

          {/* Price */}
          <div className='mt-5 sm:mt-10'>
            <Button className='rounded-full '>
              <span className='text-sm sm:text-md lg:text-lg font-bold text-secondary px-7'>
                ${price.toFixed(2)}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CourseInfo() {
  return (
    <div className='bg-secondary h-screen px-4 lg:px-16 xl:px-28 pt-28 w-full mx-auto flex flex-col '>
      <CourseInfosCard
        id={'1'}
        title={'Introduction to Programming'}
        rating={4.5}
        totalRatings={312}
        lessons={12}
        students={312}
        category={['Tech', 'Contemporary']}
        price={39.0}
        description={
          'Whether you are a beginner or an experienced developer, explore hands-on tutorials, real-world projects, and expert insights to level up your skills. Start building, debugging, and innovating today!'
        }
        createdAt={'2024-01-15'}
      />
    </div>
  );
}
