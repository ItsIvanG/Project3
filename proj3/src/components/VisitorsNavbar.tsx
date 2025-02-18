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

import { VISITORS_NAVBAR } from '@/app/constants';

export function VisitorsNavbar() {
  return (
    <div className='fixed top-0 left-0 right-0 w-full bg-secondary shadow-md z-30'>
      <div className='px-14 py-3 w-full flex flex-row'>
        <div className='flex flex-grow items-center justify-between'>
          {/* Left side (Logo and Navigation Links) */}
          <div className='flex items-center gap-10'>
            <div>
              <Link href='/'>
                <Image
                  src='/logo.png'
                  width={100}
                  height={50}
                  alt='Logo'
                  className='mt-[-3px]'
                />
              </Link>
            </div>

            {/* Mapping through VISITORS_NAVBAR */}
            {VISITORS_NAVBAR.map((nav) => (
              <div
                key={nav.key}
                className='px-6 py-2 rounded-full text-md font-medium bg-secondary text-primary hover:bg-primary/5'
              >
                <Link href={nav.href} legacyBehavior passHref>
                  {nav.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side (Search Bar and Auth Buttons) */}
          <div className='flex items-center gap-7'>
            {/* Search Bar */}
            <div className='relative flex items-center'>
              <div className='absolute left-3 bg-primary rounded-full p-1 flex items-center justify-center z-10'>
                <FiSearch className='text-secondary text-lg' />
              </div>
              <input
                type='text'
                placeholder='What do you want to learn?'
                className='pl-12 px-5 py-2 rounded-full bg-secondary border border-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent w-80'
              />
            </div>

            {/* Sign In and Sign Up Buttons */}
            <Link
              href='/login'
              className='px-6 py-2 rounded-full text-md font-medium bg-secondary text-primary hover:bg-primary/5'
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
        </div>
      </div>
    </div>
  );
}
