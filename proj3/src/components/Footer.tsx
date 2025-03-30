import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/app/constants';

export function Footer() {
  return (
    <footer className='bg-primary dark:bg-black text-secondary dark:text-primary/75 py-10 px-10 lg:px-24'>
      <div>
        <div className='w-full flex flex-col lg:grid lg:grid-cols-4 gap-8 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start'>
          {/* Logo and Description */}
          <div className='lg:col-span-2 space-y-4'>
            <Link
              href='/'
              className='flex justify-center items-center lg:justify-start gap-2'
            >
              <Image
                src='/logo.png'
                alt='Keystone Logo'
                width={180}
                height={80}
              />
            </Link>
            <p className='text-secondary/75 dark:text-primary/75 lg:max-w-md text-sm xl:text-lg'>
              Keystone Business Builders – Empowering entrepreneurs with
              knowledge, connections, and hands-on learning to build success
              together.
            </p>
          </div>

          {/* Navigation Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className='font-semibold text-sm xl:text-lg lg:mb-4 text-secondary/75 dark:text-primary/75'>
                {column.title}
              </h3>
              <ul className='lg:space-y-3 text-base xl:text-lg'>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-sm xl:text-lg text-secondary/75 dark:text-primary/75 hover:text-secondary dark:hover:text-primary transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='mt-12 pt-8 border-t border-secondary/40 dark:border-primary/50'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-secondary/75 dark:text-primary/75 text-center md:text-start'>
              Copyright © 2025 Keystone Business Builders, Inc. All rights
              reserved.
            </p>

            <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
              {/* Social Links */}
              <div className='flex items-center gap-1 lg:gap-4'>
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className='w-8 h-8 rounded-full border border-secondary/75 dark:border-primary/75 hover:dark:border-primary/75 flex items-center justify-center hover:bg-secondary/10 dark:hover:text-primary transition-colors'
                    aria-label={social.label}
                  >
                    <social.icon className='w-4 h-4' />
                  </Link>
                ))}
              </div>

              {/* Legal Links */}
              {/* <div className='flex items-center gap-6 text-sm text-secondary/75 dark:text-primary/75'>
                <Link
                  href='/privacypolicy'
                  className='hover:text-secondary dark:hover:text-primary transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='hover:text-secondary dark:hover:text-primary transition-colors'
                >
                  Terms of Use
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
