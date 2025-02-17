'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function VisitorsNavbar() {
  return (
    <div className='fixed top-0 left-0 right-0 w-full bg-secondary shadow-md'>
      <NavigationMenu className='px-14 py-3 w-full'>
        <NavigationMenuList className='flex items-center justify-between w-full'>
          {/* Left side (Logo and Navigation Links) */}
          <div className='flex items-center gap-5'>
            <NavigationMenuItem>
              <Link href='/'>
                <Image
                  src='/logo.png'
                  width={100}
                  height={50}
                  alt='Logo'
                  className='mt-[-3px]'
                />
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href='/getting-started' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href='/components' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>

          <div className='w-[455px]'></div>

          {/* Right side (Search Bar and Auth Buttons) */}
          <div className='flex items-center gap-7'>
            {/* Search Bar */}
            <div className='relative flex items-center'>
              <FiSearch className='absolute left-4 text-primary' />
              <input
                type='text'
                placeholder='What do you want to learn?'
                className='pl-12 px-5 py-2 rounded-full bg-secondary border border-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent w-80'
              />
            </div>

            {/* Sign In and Sign Up Buttons */}
            <Link
              href='/login'
              className='px-6 py-2 rounded-full text-md font-medium bg-accent text-primary hover:bg-primary/5'
            >
              Sign In
            </Link>
            <Link
              href='/signup'
              className='px-6 py-2 rounded-full text-md font-medium bg-primary text-secondary hover:bg-primary/90'
            >
              Sign Up
            </Link>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
