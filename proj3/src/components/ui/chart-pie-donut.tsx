'use client';

import { Pie, PieChart, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartDataItem } from '@/lib/definitions';

// Constants
const TOTAL_CHAPTERS = 10;
const CHAPTERS_READ = 6;

// Chart Config for Labels & Colors
const chartConfig: ChartConfig = {
  value: { label: 'Chapters' },
  completed: { label: 'Completed', color: 'bg-primary' },
  remaining: { label: 'Remaining', color: 'hsl(220, 14%, 96%)' },
};

export function ChartPieDonut({ chartData }: { chartData: ChartDataItem[] }) {
  return (
    <Card className='flex flex-col border shadow w-full rounded-lg'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-2xl'>Total Chapters Read</CardTitle>
        <CardDescription className='text-center leading-tight'>
          This is the total number of chapters you have read.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0 w-full p-0 '>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
            />

            <Tooltip formatter={(value, name) => [`${value} chapters`, name]} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>
          You're doing great!
        </div>
      </CardFooter>
    </Card>
  );
}
