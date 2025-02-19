import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/app/constants';

export function Footer() {
  return (
    <footer className='bg-primary text-secondary py-10 px-32'>
      <div className=''>
        <div className='grid grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='lg:col-span-2 space-y-4'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src='/logo.png'
                alt='Keystone Logo'
                width={180}
                height={80}
              />
            </Link>
            <p className='text-secondary/75 max-w-md'>
              Keystone Business Builders – Empowering entrepreneurs with
              knowledge, connections, and hands-on learning to build success
              together.
            </p>
          </div>

          {/* Navigation Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className='font-semibold text-lg mb-4'>{column.title}</h3>
              <ul className='space-y-3'>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-secondary/75 hover:text-secondary transition-colors'
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
        <div className='mt-12 pt-8 border-t border-secondary/40'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-secondary/75'>
              Copyright © 2025 Keystone Business Builders, Inc. All rights
              reserved.
            </p>

            <div className='flex items-center gap-8'>
              {/* Social Links */}
              <div className='flex items-center gap-4'>
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className='w-8 h-8 rounded-full border border-secondary/40 flex items-center justify-center hover:bg-secondary/10 transition-colors'
                    aria-label={social.label}
                  >
                    <social.icon className='w-4 h-4' />
                  </Link>
                ))}
              </div>

              {/* Legal Links */}
              <div className='flex items-center gap-6 text-sm text-secondary/75'>
                <Link
                  href='/privacy'
                  className='hover:text-secondary transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='hover:text-secondary transition-colors'
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
