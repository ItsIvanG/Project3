import { VisitorPricing } from '@/components/VisitorPricing';
import { VisitorsAbout } from '@/components/VisitorsAbout';
import { VisitorsAnalytics } from '@/components/VisitorsAnalytics';
import { VisitorsCourses } from '@/components/VisitorsCourses';
import { VisitorsHome } from '@/components/VisitorsHome';
import { VisitorsNavbar } from '@/components/VisitorsNavbar';
import VisitorsTestimonials from '@/components/VisitorsTestimonials';

export default function Page() {
  return (
    <>
      <VisitorsNavbar />
      <VisitorsHome />
      <VisitorsAnalytics />
      <VisitorsCourses />
      <VisitorsAbout />
      <VisitorPricing />
      <VisitorsTestimonials />
    </>
  );
}
