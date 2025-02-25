import { VisitorPricing } from "@/components/VisitorPricing";
import { VisitorsAbout } from "@/components/VisitorsAbout";
import { VisitorsAnalytics } from "@/components/VisitorsAnalytics";
import { VisitorsCourses } from "@/components/VisitorsCourses";
import { VisitorsHome } from "@/components/VisitorsHome";
import { Navbar } from "@/components/Navbar";
import { VisitorsTestimonials } from "@/components/VisitorsTestimonials";
import { VisitorsQualities } from "@/components/VisitorsQualities";
import { VisitorsMotto } from "@/components/VisitorsMotto";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <VisitorsHome />
      <VisitorsAnalytics />
      <VisitorsCourses />
      <VisitorsAbout />
      <VisitorPricing />
      <VisitorsTestimonials />
      <VisitorsQualities />
      <VisitorsMotto />
      <Footer />
    </>
  );
}
