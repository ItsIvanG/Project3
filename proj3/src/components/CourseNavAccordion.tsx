import { CourseChaptersAccordion } from '@/lib/definitions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';

export default function CourseNavAccordion({
  courseChapters,
}: {
  courseChapters: CourseChaptersAccordion[];
}) {
  return (
    <div className='w-full bg-card rounded-b-lg lg:rounded-br-lg shadow'>
      <Accordion type='multiple' className='w-full'>
        {courseChapters?.map((chapter, index) => {
          // Check if the entire chapter is completed
          const allFinished = chapter.subchapters.every(
            (sub) => sub.isFinished
          );
          const progressPercent = allFinished
            ? 100
            : chapter.chapterProgressPercent;

          return (
            <AccordionItem
              value={`chapter-${index}`}
              key={index}
              className={cn('border-b', allFinished && 'bg-green-100')} // Chapter background when complete
            >
              <AccordionTrigger className='px-4 hover:no-underline'>
                <div className='flex flex-col w-full gap-2'>
                  <span className='text-base font-bold text-left'>
                    {chapter.chapterTitle}
                  </span>
                  <div className='w-full flex flex-row items-center gap-2'>
                    <div className='w-full'>
                      {' '}
                      {/* Fixed width progress bar */}
                      <Progress
                        value={progressPercent}
                        className='h-1 w-full'
                      />
                    </div>
                    <span className='text-xs text-muted-foreground min-w-[30px] text-center'>
                      {progressPercent}%
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-0'>
                <div className='space-y-0'>
                  {chapter.subchapters.map((subchapter, subIndex) => (
                    <div
                      key={subIndex}
                      className={cn(
                        'flex items-center gap-2 w-full text-sm transition-colors pl-6', // Uniform left margin
                        subchapter.isFinished
                          ? 'bg-green-50' // Full width green background when finished
                          : 'hover:bg-muted/50 cursor-pointer'
                      )}
                    >
                      {subchapter.isFinished ? (
                        <CheckCircle className='h-4 w-4 text-green-500 flex-shrink-0' />
                      ) : (
                        <Circle className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                      )}
                      <span
                        className={cn(
                          'text-sm p-2',
                          subchapter.isFinished && 'text-muted-foreground'
                        )}
                      >
                        {subchapter.subchaptertitle}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
