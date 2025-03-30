
'use client';
import { Star, Users, MonitorPlay } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';
import type { CourseInclusion, CourseInfoProps } from '@/lib/definitions';
import { CourseInfos } from '@/app/constants';
import { Button } from './ui/button';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import CourseResource from './CourseResource';
import CourseInfosCard from './CourseInfosCard';

// Updated CourseIncludes to properly render icons as components
function CourseIncludes({ icon: IconComponent, inclusion }: CourseInclusion) {
  return (

    <div className="ml-4 flex flex-row mb-2 items-center">
      <Image className="mr-4" src={icon} alt={"•"} height={0} width={26} />
      <span className="text-xs sm:text-sm md:text-base lg:text-lg">

        {inclusion}
      </span>
    </div>
  );
}

export default function CourseInfo() {

  const router = useRouter();
  const { id: courseId } = useParams(); // ✅ Correct way to get [id] from URL

  const [data, setData] = useState<CourseInfoProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    if (!courseId) return; // Prevent unnecessary fetch if courseId is undefined

    async function fetchCourseData() {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/init/courses/get",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ course_id: Number(courseId) }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch course data");

        const result = await response.json();
        const course = JSON.parse(result.body).course;

        const mappedData: CourseInfoProps = {
          courseInfoHeader: {
            id: course.course_id,
            title: course.course_name,
            rating: parseFloat(course.course_average_rating),
            totalRatings: course.course_rating_count,
            lessons: course.course_estimated_time,
            students: 0, // Placeholder (update when API provides students)
            category: Array.isArray(course.category)
              ? course.category
              : [course.category], // ✅ Convert string to array
            price: parseFloat(course.price),
            description: course.course_description,
            instructor: course.instructor_name,
          },
          courseIncludes: [
            {
              icon: "/path/to/icon.png",
              inclusion: "Certificate of Completion",
            }, // Placeholder
          ],
          courseResources: [
            {
              title: "Intro to AI",
              createdAt: course.course_created_on,
              type: "PDF",
              url: "/path/to/pdf",
            }, // Placeholder
          ],
          expOutcomes: [course.expected_outcomes],
        };

        setData(mappedData);
      } catch (err) {
        setError("Error fetching course data");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseData();
  }, [courseId, filterCategory]);

  if (loading) return <p>Loading course data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No course data available</p>;


  const { courseInfoHeader, courseIncludes, courseResources, expOutcomes } =
    data;

  return (
    <div className="bg-secondary px-4 md:px-10 lg:px-16 xl:px-28 py-32 w-full mx-auto flex flex-col gap-10">
      {/* <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Course Details</h1>
        <Button
          onClick={() => setFilterCategory("AI")}
          className="bg-primary text-white"
        >
          Filter by Category
        </Button>
      </div> */}

      <CourseInfosCard {...courseInfoHeader} isOngoing={true} createdAt={""} />

      <div className="w-full">
        <p className="font-bold text-xl md:text-3xl text-primary mb-5">
          Expected Outcomes:
        </p>
        {expOutcomes.map((outcome, index) => (

          <div key={index} className="ml-4">
            •{" "}
            <span className="ml-2 text-xs sm:text-sm md:text-base lg:text-lg">
              {outcome}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full">
        <p className="font-bold text-xl md:text-3xl text-primary mb-5">
          Course Includes
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          {courseIncludes.map(({ icon, inclusion }, index) => (
            <CourseIncludes key={index} icon={icon} inclusion={inclusion} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        <p className="font-bold text-xl md:text-3xl text-primary mb-5">
          Resources
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 ">
          {courseResources.map(({ title, createdAt, url, type }, index) => (

            <CourseResource
              key={index}
              title={title}
              createdAt={createdAt}
              type={type}

              url={url}

            />
          ))}
        </div>
      </div>
    </div>
  );
}
