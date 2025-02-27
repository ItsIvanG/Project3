'use client';
import { useState } from 'react';
import { ChartPieDonut } from './ui/chart-pie-donut';
import { DashboardStats, EnrolledCourse } from '@/lib/definitions';
import { StatsCard } from '@/lib/definitions';
import { DashboardInfos } from '@/app/constants';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { ReusableSelect } from './ui/select';
import { CheckCircle } from 'lucide-react';

function RecentlyEnrolledComponent({
  id,
  imgSrc,
  author,
  title,
  finishedPercentage,
  finishedOverTotal,
}: EnrolledCourse) {
  return (
    <Card
      className='w-full group cursor-pointer overflow-hidden'
      // onClick={() => redirect(id)}
      //ung course progress pupuntahan neto parang kamukha ng course info
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
      <CardHeader className='p-4'>
        <p className='text-xs text-muted-foreground'>A course by {author}</p>
        <h3 className='font-semibold text-lg leading-none tracking-tight line-clamp-1'>
          {title}
        </h3>
      </CardHeader>
      <CardContent className='pb-3 px-3'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <div>
              <p className='text-xs text-muted-foreground'>
                {finishedPercentage}%
              </p>
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>
                {finishedOverTotal}
              </p>
            </div>
          </div>
          <div>
            <Progress value={finishedPercentage} />
          </div>
          <div className='pt-6 flex justify-end'>
            <Button
              variant={finishedPercentage === 100 ? 'default' : 'outline'}
              disabled={finishedPercentage === 100}
            >
              {finishedPercentage === 100 ? (
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

function StatsCardComponent({ icon, title, value }: StatsCard) {
  return (
    <div className='w-full bg-card shadow rounded-lg p-4 flex flex-row gap-4'>
      <div className='bg-card shadow border rounded-md flex justify-center items-center'>
        <img src={icon} alt='•' className='h-10 w-10 object-contain p-2' />
      </div>
      <div className='flex flex-col'>
        <div>
          <p className='text-xl font-bold text-primary'>{value}</p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardStats>(DashboardInfos);

  //API CALL

  const { recentlyEnrolled, chart, statscard } = data;

  return (
    <div className='w-full px-10 lg:px-16 xl:px-28 py-32 mx-auto flex flex-col gap-10'>
      <p className='font-bold text-3xl md:text-5xl text-primary'>Dashboard</p>
      <div className='w-full flex flex-col-reverse lg:flex-row gap-5'>
        <div className='border p-5 md:p-10 rounded-lg bg-card shadow w-full lg:w-2/3 flex flex-col gap-5'>
          <p className='font-bold text-xl md:text-3xl'>
            Recently Enrolled Courses
          </p>
          <div className='w-full sm:w-auto flex justify-end'>
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
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
            {recentlyEnrolled.map((myCourse, index) => (
              <RecentlyEnrolledComponent key={index} {...myCourse} />
            ))}
          </div>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-5'>
          <div className='w-full sm:w-1/2 lg:w-auto'>
            <ChartPieDonut chartData={chart} />
          </div>

          <div className='w-full sm:w-1/2 lg:w-auto gap-5 flex flex-col '>
            {statscard.map((stat, index) => (
              <StatsCardComponent key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
