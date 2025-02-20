'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri';

import { VISITORS_NAVBAR } from '@/app/constants';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function VisitorsNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='fixed top-0 left-0 right-0 w-full bg-secondary shadow-md z-30'>
      <div className='px-5 md:px-14 py-3 w-full flex items-center justify-between'>
        {/* Left side (Logo and Navigation Links) */}
        <div className='flex items-center gap-4 md:gap-7'>
          {/* Logo */}
          <Link href='/'>
            <Image
              src='/logo.png'
              width={100}
              height={50}
              alt='Logo'
              className='mt-[-3px]'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center'>
            {VISITORS_NAVBAR.map((nav) => (
              <Link
                key={nav.key}
                href={nav.href}
                className='px-6 py-2 rounded-full text-md font-medium bg-secondary text-primary hover:bg-primary/5'
              >
                {nav.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side (Search Bar & Auth Buttons) */}
        <div className='hidden lg:flex items-center gap-4 lg:gap-7'>
          {/* Search Bar */}
          <div className='relative flex items-center'>
            <div className='absolute left-3 bg-primary rounded-full p-1 flex items-center justify-center z-10'>
              <FiSearch className='text-secondary text-lg' />
            </div>
            <Input
              type='text'
              placeholder='Search course'
              className='pl-12 rounded-full bg-secondary border border-primary text-primary'
            />
          </div>

          {/* Auth Buttons */}
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

        {/* Mobile Menu Button */}
        <div className='flex lg:hidden items-center justify-between w-full'>
          <div className='flex-1'></div>
          {/* Search Bar */}
          <div className='relative flex items-center'>
            <div className='absolute left-3 bg-primary rounded-full p-1 flex items-center justify-center z-10'>
              <FiSearch className='text-secondary text-xs' />
            </div>
            <Input
              type='text'
              placeholder='Search course'
              className='pl-10 text-xs rounded-full bg-secondary border border-primary text-primary'
            />
          </div>

          <Button
            onClick={toggleMenu}
            className='text-primary text-2xl'
            variant='ghost'
          >
            {isOpen ? <RiCloseFill /> : <HiOutlineMenu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with Smooth Animation */}
      <div
        className={`absolute top-14 right-2 w-1/3 bg-secondary shadow-md rounded-md flex flex-col items-center p-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {VISITORS_NAVBAR.map((nav) => (
          <Link
            key={nav.key}
            href={nav.href}
            className='py-2 text-md font-normal text-primary rounded-md hover:bg-primary/5 w-full text-center'
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            {nav.label}
          </Link>
        ))}

        {/* Mobile Auth Buttons */}
        <Link
          href='/login'
          className='px-6 py-2 rounded-md text-md font-normal text-primary hover:bg-primary/5 w-full text-center'
          onClick={() => setIsOpen(false)}
        >
          Sign In
        </Link>
        <Link
          href='/signup'
          className='px-6 py-2 rounded-md text-md font-normal text-primary hover:bg-primary/5 w-full text-center'
          onClick={() => setIsOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
