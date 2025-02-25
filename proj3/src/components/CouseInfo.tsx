//add another button for filter by categories
'use client';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type {
  CourseInclusion,
  CourseInfoHeader,
  CourseInfoProps,
  CourseResources,
} from '@/lib/definitions';
import { CourseInfos } from '@/app/constants';
import { Button } from './ui/button';
import { useState } from 'react';

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
}: CourseInfoHeader) {
  return (
    <Card className='w-full overflow-hidden h-fit xl:h-2/3 shadow-md '>
      <div className='w-full h-full flex flex-col lg:flex-row'>
        {/* Course Image */}
        <div className='relative w-full lg:flex-grow lg:w-1/2 overflow-hidden bg-green-400'>
          <img
            src={imgSrc || '/course1.jpeg'}
            alt={title}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Course Details */}
        <div className='p-4 sm:p-3 md:p-6 w-full  lg:w-1/2 flex flex-col flex-grow'>
          <h3 className='text-xl md:text-3xl lg:text-4xl font-bold text-primary md:mb-3'>
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
          <p className='mt-2 text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg md:mb-3 leading-tight'>
            {description}
          </p>

          {/* Rating */}
          <div className='mt-2 flex items-center gap-1 sm:gap-2 md:mb-3'>
            <div className='flex'>
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
            </div>
            <span className='text-muted-foreground text-xs sm:text-sm'>
              ({totalRatings})
            </span>
          </div>

          {/* Course Stats */}
          <div className='mt-2 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3'>
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
          <div className='mt-auto flex items-end'>
            <Button className='rounded-full'>
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
function CourseIncludes({ icon, inclusion }: CourseInclusion) {
  return (
    <div className='ml-4'>
      <span className='mr-2'>{icon}</span>
      {inclusion}
    </div>
  );
}

function CourseResource({ title, createdAt, type }: CourseResources) {
  return (
    <div className='border flex flex-row'>
      <div>
        <span>{title}</span>
        <span>{createdAt}</span>
        <div>{type}</div>
      </div>
      <div>{'>'}</div>
    </div>
  );
}

export default function CourseInfo() {
  const [data, setData] = useState<CourseInfoProps>(CourseInfos);
  //api call here

  //destructure data
  const { courseInfoHeader, courseIncludes, courseResources, expOutcomes } =
    data;

  return (
    <div className='bg-secondary px-4 lg:px-16 xl:px-28 py-32 w-full mx-auto flex flex-col '>
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
        createdAt={courseInfoHeader.createdAt}
      />
      <div className='w-full'>
        <p>Expected Outcomes</p>
        {expOutcomes.map((outcome, index) => {
          return (
            <div key={index} className='ml-4'>
              • <span className='ml-2'>{outcome}</span>
            </div>
          );
        })}
      </div>
      <div className='w-full'>
        <p>Course Includes</p>
        {courseIncludes.map(({ icon, inclusion }, index) => {
          return (
            <CourseIncludes key={index} icon={icon} inclusion={inclusion} />
          );
        })}
      </div>
      <div className='w-full'>
        <p>Resources</p>
        {courseResources.map(({ title, createdAt, type }, index) => {
          return (
            <CourseResource
              key={index}
              title={title}
              createdAt={createdAt}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
}
