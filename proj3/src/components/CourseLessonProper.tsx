"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store"; // Assuming you have a store hook
import { courseNavigation } from "@/app/constants";
import CourseNavAccordion from "./CourseNavAccordion";
import CourseChapterLessons from "./CourseChapterLessons";
import { CourseNavigation, CourseChaptersAccordion } from "@/lib/definitions";

export default function CourseLessonProper() {
  const [data, setData] = useState<CourseNavigation>(courseNavigation);
  const [lessonId, setLessonId] = useState<number | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter(); // Hook for URL updates
  const courseId = Number(params.id); // Extract course ID from URL
  const studentId = useUserStore((state) => state.roleId); // Get student ID from store.ts

  useEffect(() => {
    if (!courseId || !studentId) return;

    const fetchLessonId = async () => {
      try {
        const response = await fetch(
          "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/currentlesson",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "get",
              course_id: courseId,
              student_id: studentId,
            }),
          }
        );

        const responseData = await response.json();
        if (responseData.lesson_id) {
          setLessonId(responseData.lesson_id);

          // If lesson_id is found and not in URL, update the URL
          const urlLessonId = searchParams.get("lesson_id");
          if (!urlLessonId) {
            router.replace(
              `/courses/myCourses/${courseId}/take?lesson_id=${responseData.lesson_id}`
            );
          }
        } else {
          console.warn("No current lesson found for student.");
        }
      } catch (error) {
        console.error("Error fetching current lesson:", error);
      }
    };

    // Check if lesson_id exists in URL, otherwise fetch it
    const urlLessonId = searchParams.get("lesson_id");
    if (urlLessonId) {
      setLessonId(Number(urlLessonId));
    } else {
      fetchLessonId();
    }
  }, [courseId, studentId]);

  useEffect(() => {
    if (!courseId) return;

    const fetchLessons = async () => {
      try {
        const response = await fetch(
          "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/lessons",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ get_lessons_from_course_id: courseId }),
          }
        );

        const responseData = await response.json();
        if (responseData.status === "success" && responseData.lessons) {
          console.log("Fetched lessons: ", responseData.lessons);

          const mappedChapters: CourseChaptersAccordion[] = [
            {
              chapterTitle: "Lessons",
              subchapters: responseData.lessons
                .sort((a, b) => a.lesson_no - b.lesson_no)
                .map((lesson) => ({
                  subchaptertitle: lesson.lesson_name,
                  lessonId: lesson.lesson_id,
                  isFinished: false, // Needs real progress tracking
                })),
              chapterProgressPercent: 0,
            },
          ];

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
          <CourseChapterLessons lessonId={lessonId} />
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
