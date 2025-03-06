import { CourseResources } from '@/lib/definitions';
import { IoIosArrowForward } from 'react-icons/io';

export default function CourseResource({
  title,
  createdAt,
  type,
}: CourseResources) {
  return (
    <div className='border border-primary/30 flex flex-row items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-primary/5'>
      <div className='flex flex-col'>
        <span className='font-bold text-base text-primary'>{title}</span>
        <span className='text-sm text-primary'>{createdAt}</span>
        <div className='text-sm bg-primary text-secondary rounded-full flex justify-center p-1 px-6'>
          {type}
        </div>
      </div>
      <div className='flex items-center justify-center bg-primary text-secondary w-7 h-7 rounded-full'>
        <IoIosArrowForward className='text-lg' />
      </div>
    </div>
  );
}
