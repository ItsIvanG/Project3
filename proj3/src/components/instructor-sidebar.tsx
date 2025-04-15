import { useState } from 'react';
import { Inbox, Settings, LogOut, File } from 'lucide-react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import SignOutDialog from '@/custom/SignOutDialog'; // Import the SignOutDialog component
import Link from 'next/link';

const items = [
  {
    title: 'Courses',
    url: 'panel',
    icon: Inbox,
  },
  {
    title: 'Files',
    url: 'files',
    icon: File,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarContent className='m-5'>
        <SidebarGroup>
          <Link href='/'>
            <Image
              src='/logo.png'
              width={100}
              height={50}
              alt='Logo'
              className='w-full h-auto max-w-[150px] object-contain m-3'
            />
          </Link>
          <SidebarGroupLabel>INSTRUCTOR</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Log Out button triggers SignOutDialog */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className='flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-900'
                  >
                    <LogOut className='text-red-600' />
                    <span>Log out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Sign-out confirmation dialog */}
      <SignOutDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </Sidebar>
  );
}
