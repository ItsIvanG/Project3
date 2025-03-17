"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { courseNavigation } from "@/app/constants";
import CourseNavAccordion from "./CourseNavAccordion";
import CourseChapterLessons from "./CourseChapterLessons";
import { CourseNavigation, CourseChaptersAccordion } from "@/lib/definitions";

export default function CourseLessonProper() {
  const [data, setData] = useState<CourseNavigation>(courseNavigation);
  const params = useParams();
  const courseId = params.id; // Extract course ID

  useEffect(() => {
    if (!courseId) return; // Ensure courseId is available

    const fetchLessons = async () => {
      try {
        const response = await fetch(
          "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/lessons",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              get_lessons_from_course_id: Number(courseId),
            }),
          }
        );

        const responseData = await response.json();

        if (responseData.status === "success" && responseData.lessons) {
          console.log("Fetched lessons: ", responseData.lessons);

          // Transform lessons into CourseChaptersAccordion format
          const mappedChapters: CourseChaptersAccordion[] = [
            {
              chapterTitle: "Lessons", // Static title for now
              subchapters: responseData.lessons
                .sort((a, b) => a.lesson_no - b.lesson_no) // Sort by lesson number
                .map((lesson) => ({
                  subchaptertitle: lesson.lesson_name, // Fix incorrect key
                  lessonId: lesson.lesson_id,
                  isFinished: false, // Default to false (Needs real progress tracking)
                })),
              chapterProgressPercent: 0, // Set to 0, can be updated dynamically
            },
          ];

          // Update the state with fetched lessons
          setData((prev) => ({
            ...prev,
            courseChapters: mappedChapters,
          }));
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div className="bg-secondary px-4 md:px-10 xl:px-20 w-full mx-auto flex flex-col">
      <div className="w-full bg-primary h-10 rounded-t-lg flex items-center px-5">
        <h2 className="font-bold text-base md:text-xl text-secondary">
          {data.courseTitle}
        </h2>
      </div>
      <div className="w-full h-fit flex flex-col lg:flex-row gap-10 lg:gap-0">
        <div className="w-full lg:w-3/4">
          <CourseChapterLessons />
        </div>
        <div className="w-full lg:w-1/4 h-fit flex flex-col">
          <div className="w-full bg-primary h-10 flex lg:hidden items-center px-5">
            <p className="text-base font-semibold text-secondary">
              Course Progress
            </p>
          </div>
          <CourseNavAccordion courseChapters={data.courseChapters} />
        </div>
      </div>
    </div>
  );
}
