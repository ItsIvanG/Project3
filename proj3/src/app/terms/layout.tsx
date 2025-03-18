import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='w-full min-h-screen relative'>
      <Navbar />
      <div className='w-full h-full'>{children}</div>
      <Footer />
    </main>
  );
}
