"use client";
import { useEffect, useMemo, useState } from "react";
import { ChartPieDonut } from "./ui/chart-pie-donut";
import { StatsCard, DashboardStats, EnrolledCourse } from "@/lib/definitions";
import { DashboardInfos } from "@/app/constants";
import { GrNext } from "react-icons/gr";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ReusableSelect } from "./ui/select";
import { useRouter } from "next/navigation";
import RecentlyEnrolledCourses from "./RecentlyEnrolledCourses";
import Link from "next/link";
import { Input } from "./ui/input";
import { FiSearch } from "react-icons/fi";
import { useUserStore } from "@/store"; // adjust this path to match your project structure
import { IconMap } from "@/app/constants/icons";

function StatsCardComponent({ icon, title, value }: StatsCard) {
  const IconComponent = icon;
  return (
    <div className="w-full bg-card shadow rounded-lg p-4 flex flex-row gap-4 items-center justify-between">
      <div className="flex flex-row gap-4 items-center">
        <div className="bg-card shadow border rounded-md flex justify-center items-center p-2 text-lg text-primary">
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold text-primary">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      {title === "Certificates Earned" && (
        <Link
          className="bg-primary text-secondary text-xs rounded-full aspect-square p-2 hover:bg-primary/90"
          href=""
        >
          <GrNext />
        </Link>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { roleId } = useUserStore(); // gets student_id
  const [data, setData] = useState<DashboardStats>(DashboardInfos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!roleId) return;

      try {
        const res = await fetch(
          "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/dashboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ student_id: roleId }),
          }
        );

        const raw = await res.json();
        const parsed = JSON.parse(raw.body);

        const totalFinishedLessons = parsed.totalFinishedLessons;
        const totalRemainingLessons = parsed.totalRemainingLessons;

        // Transform recentlyEnrolled into your EnrolledCourse shape
        const transformedData: DashboardStats = {
          chart: [
            { name: "Finished Lessons", value: totalFinishedLessons },
            { name: "Remaining Lessons", value: totalRemainingLessons },
          ],
          statscard: parsed.statscard.map((card: any) => ({
            ...card,
            icon: IconMap[card.icon] || BarChart,
          })),
          recentlyEnrolled: parsed.recentlyEnrolled.map((course: any) => ({
            id: String(course.course_id),
            imgSrc: course.thumbnail,
            author: course.created_by_instructor,
            title: course.course_name,
            finishedPercentage: course.finishedPercentage,
            finishedOverTotal: `${course.finishedPercentage}% done`,
          })),
        };

        console.log("Transformed Data: ", transformedData);

        setData(transformedData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [roleId]);

  const { recentlyEnrolled, chart, statscard } = data;

  const [generalFilter, setGeneralFilter] = useState<
    "all" | "notyetstarted" | "inprogress" | "completed"
  >("all");

  const [searchFilter, setSearchFilter] = useState<string>("");

  const generalFilteredCourses = useMemo(() => {
    let baseFiles: EnrolledCourse[] = [];

    if (generalFilter === "all") baseFiles = recentlyEnrolled;
    if (generalFilter === "notyetstarted") {
      baseFiles = recentlyEnrolled.filter(
        (course) => course.finishedPercentage === 0
      );
    }
    if (generalFilter === "inprogress") {
      baseFiles = recentlyEnrolled.filter(
        (course) =>
          course.finishedPercentage > 0 && course.finishedPercentage < 100
      );
    }
    if (generalFilter === "completed") {
      baseFiles = recentlyEnrolled.filter(
        (course) => course.finishedPercentage === 100
      );
    }

    if (searchFilter) {
      baseFiles = baseFiles.filter((course) =>
        Object.values(course).some((value) =>
          String(value).toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    }

    return baseFiles;
  }, [generalFilter, recentlyEnrolled, searchFilter]);

  if (loading) return <p className="text-center pt-20">Loading dashboard...</p>;

  return (
    <div className="w-full px-10 lg:px-16 xl:px-28 py-32 mx-auto flex flex-col gap-10">
      <p className="font-bold text-3xl md:text-5xl text-primary">Dashboard</p>
      <div className="w-full flex flex-col-reverse lg:flex-row gap-5">
        <div className="border p-5 md:p-10 rounded-lg bg-card shadow w-full lg:w-2/3 flex flex-col gap-5">
          <p className="font-bold text-xl md:text-3xl">
            Recently Enrolled Courses
          </p>
          <div className="w-full lg:w-auto flex flex-col lg:flex-row justify-end gap-3">
            <div className="relative flex items-center">
              <div className="absolute left-3 bg-primary rounded-full p-1 flex items-center justify-center z-10">
                <FiSearch className="text-secondary text-lg" />
              </div>
              <Input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.currentTarget.value)}
                placeholder="Search"
                className="pl-12 rounded-full bg-secondary border border-primary text-primary"
              />
            </div>
            <ReusableSelect
              items={[
                { name: "All", action: () => setGeneralFilter("all") },
                {
                  name: "Not yet started",
                  action: () => setGeneralFilter("notyetstarted"),
                },
                {
                  name: "In progress",
                  action: () => setGeneralFilter("inprogress"),
                },
                {
                  name: "Completed",
                  action: () => setGeneralFilter("completed"),
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {generalFilteredCourses.map((myCourse, index) => (
              <RecentlyEnrolledCourses
                key={index}
                courses={{ ...myCourse }}
                fromdashboard={true}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-5">
          <div className="w-full sm:w-1/2 lg:w-auto">
            <ChartPieDonut chartData={chart} />
          </div>
          <div className="w-full sm:w-1/2 lg:w-auto gap-5 flex flex-col">
            {statscard.map((stat, index) => (
              <StatsCardComponent key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
