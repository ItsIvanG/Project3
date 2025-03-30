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
import { useRouter } from 'next/navigation';
import { GrNext } from 'react-icons/gr';
import RecentlyEnrolledCourses from './RecentlyEnrolledCourses';
import Link from 'next/link';

function StatsCardComponent({ icon, title, value }: StatsCard) {
  const IconComponent = icon; // Correctly treating the icon as a component reference

  return (
    <div className='w-full bg-card shadow rounded-lg p-4 flex flex-row gap-4 items-center justify-between'>
      <div className='flex flex-row gap-4 items-center'>
        <div className='bg-card shadow border rounded-md flex justify-center items-center p-2 text-lg text-primary dark:text-secondary'>
          <IconComponent className='w-6 h-6' />{' '}
        </div>
        <div className='flex flex-col'>
          <p className='text-xl font-bold text-primary'>{value}</p>
          <p className='text-sm text-muted-foreground'>{title}</p>
        </div>
      </div>
      {title === 'Certificates Earned' && (
        <Link
          className='bg-primary text-secondary text-xs rounded-full aspect-square p-2 hover:bg-primary/90'
          href=''
        >
          <GrNext />
        </Link>
      )}
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
              <RecentlyEnrolledCourses
                key={index}
                courses={{ ...myCourse }}
                fromdashboard={true}
              />
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
