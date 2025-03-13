import { CourseInfoHeader } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';

// Assume isOngoing is a boolean prop that determines if the course is ongoing
export default function CourseInfosCard({
  id,
  title,
  rating,
  totalRatings,
  lessons,
  students,
  instructor,
  imgSrc,
  category,
  price,
  description,
  isOngoing, // Add this prop to check if the course is ongoing
}: CourseInfoHeader & { isOngoing: boolean }) {
  const router = useRouter();
  const name = useUserStore((state) => state.name);
  const isLoggedIn = name !== ''; // Check if user is logged in

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login if not logged in
    } else if (isOngoing) {
      router.push(`/courses/myCourses/${id}/take`); // Redirect to the course proper page if ongoing
    } else {
      router.push(`/payment/${id}`); // Redirect to payment page if not purchased
    }
  };

  return (
    <Card className='w-full overflow-hidden h-fit xl:h-2/3 shadow'>
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
                variant='outline'
                className='rounded-full border border-primary text-xs sm:text-[10px] md:text-sm'
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

          {/* Instructor */}
          <div className='md:mt-2 flex flex-col items-start text-xs sm:text-sm text-muted-foreground mb-6 '>
            <p>INSTRUCTOR</p>
            <span className='font-semibold line-clamp-1'>{instructor}</span>
          </div>

          {/* Purchase or Resume Course Button */}
          <div className='mt-auto flex items-end'>
            <Button
              className='rounded-full hover:bg-primary/90'
              onClick={handleClick}
            >
              <span className='text-sm sm:text-md lg:text-lg font-bold bg-primary hover:bg-primary/90 text-secondary px-7'>
                {isOngoing ? 'Resume Course' : `$${price.toFixed(2)}`}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
