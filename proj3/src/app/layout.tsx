import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Customize weights if needed
  variable: '--font-nunito-sans', // Allows usage in CSS
});

export const metadata: Metadata = {
  title: 'Keystone Business Builders',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={nunitoSans.variable}>
      <head />
      <body className={nunitoSans.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
