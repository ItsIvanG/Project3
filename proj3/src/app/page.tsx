import { VisitorsAnalytics } from '@/components/VisitorsAnalytics';
import { VisitorsCourses } from '@/components/VisitorsCourses';
import { VisitorsHome } from '@/components/VisitorsHome';
import { VisitorsNavbar } from '@/components/VisitorsNavbar';

export default function Page() {
  return (
    <>
      <VisitorsNavbar />
      <VisitorsHome />
      <VisitorsAnalytics />
      <VisitorsCourses />
    </>
  );
}
