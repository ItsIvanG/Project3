import React from 'react';
import { UserCircle } from 'lucide-react'; // Placeholder icon
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoSettingsOutline } from 'react-icons/io5';
import { LiaSignOutAltSolid } from 'react-icons/lia';

const UserBadge = ({ name = 'Guest', pic = '', role = '' }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex justify-center items-center space-x-5 w-fit p-0'>
          <UserCircle className='w-8 h-8 ' /> {/* Icon */}
          <div className='flex flex-col text-left gap-0'>
            <span className='font-medium text-sm px-2'>{name}</span>
            <span className='font-light text-muted-foreground px-2 text-[10px] uppercase'>
              {role.toUpperCase()}
            </span>{' '}
            {/* Role */}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IoSettingsOutline />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LiaSignOutAltSolid />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBadge;
