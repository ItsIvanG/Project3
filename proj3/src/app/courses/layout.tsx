import { VisitorsNavbar } from '@/components/VisitorsNavbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='w-full h-screen relative'>
      <VisitorsNavbar />
      <div className='w-full h-full'>{children}</div>
    </main>
  );
}
