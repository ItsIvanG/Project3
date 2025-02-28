import { EnrolledCourse } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

export default function RecentlyEnrolledCourses({
  fromdashboard,
  courses,
}: {
  fromdashboard?: boolean;
  courses: EnrolledCourse;
}) {
  const router = useRouter();

  const redirect = (id: string) => {
    const route = fromdashboard
      ? `courses/myCourses/${id}/view`
      : `myCourses/${id}/view`;
    router.push(route);
  };
  return (
    <Card
      className='w-full group cursor-pointer overflow-hidden'

      //ung course progress pupuntahan neto parang kamukha ng course info
    >
      <div className='relative h-40 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden'>
        {courses.imgSrc ? (
          <img
            src={courses.imgSrc || '/placeholder.svg'}
            alt={courses.title}
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
      <CardHeader className='p-5'>
        <p className='text-xs text-muted-foreground'>
          A course by {courses.author}
        </p>
        <h3 className='font-semibold text-lg leading-none tracking-tight line-clamp-1'>
          {courses.title}
        </h3>
      </CardHeader>
      <CardContent className='pb-5 px-5'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <div>
              <p className='text-xs text-muted-foreground'>
                {courses.finishedPercentage}%
              </p>
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>
                {courses.finishedOverTotal}
              </p>
            </div>
          </div>
          <div>
            <Progress value={courses.finishedPercentage} />
          </div>
          <div className='pt-6 flex justify-end'>
            <Button
              variant={
                courses.finishedPercentage === 100 ? 'default' : 'outline'
              }
              disabled={courses.finishedPercentage === 100}
              onClick={() => redirect(courses.id)}
            >
              {courses.finishedPercentage === 100 ? (
                <>
                  <CheckCircle className='w-4 h-4' /> Completed
                </>
              ) : (
                'Resume'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
