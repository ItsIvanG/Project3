"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { courseNavigation } from "@/app/constants";
import CourseNavAccordion from "./CourseNavAccordion";
import CourseChapterLessons from "./CourseChapterLessons";
import { CourseNavigation, CourseChaptersAccordion } from "@/lib/definitions";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CourseLessonProper() {
  const [data, setData] = useState<CourseNavigation>(courseNavigation);
  const [lessonId, setLessonId] = useState<number | null>(null);
  const [isFirstLesson, setIsFirstLesson] = useState<boolean>(false);
  const [isLastLesson, setIsLastLesson] = useState<boolean>(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const courseId = Number(params.id);
  const studentId = useUserStore((state) => state.roleId);

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
        setIsFirstLesson(responseData.isFirstLesson);
        setIsLastLesson(responseData.isLastLesson);

        const urlLessonId = searchParams.get("lesson_id");
        if (!urlLessonId) {
          router.replace(
            `/courses/myCourses/${courseId}/take?lesson_id=${responseData.lesson_id}`
          );
        }
      } else {
        console.warn("No current lesson found.");
      }
    } catch (error) {
      console.error("Error fetching current lesson:", error);
    }
  };

  const changeProgress = async (direction: "forward" | "backward") => {
    try {
      const response = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/change_progress",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: studentId,
            course_id: courseId,
            direction: direction,
          }),
        }
      );

      const rawData = await response.json(); // First parse
      const responseData = JSON.parse(rawData.body); // Second parse

      if (responseData.lesson_id) {
        setLessonId(responseData.lesson_id);
        setIsFirstLesson(responseData.isFirstLesson);
        setIsLastLesson(responseData.isLastLesson);

        router.replace(
          `/courses/myCourses/${courseId}/take?lesson_id=${responseData.lesson_id}`
        );

        console.log("moving to url lesson_id", responseData.lesson_id);
      }
    } catch (error) {
      console.error("Error changing progress:", error);
    }
  };

  useEffect(() => {
    if (!courseId || !studentId) return;

    const urlLessonId = searchParams.get("lesson_id");
    if (urlLessonId) {
      setLessonId(Number(urlLessonId));
    }

    fetchLessonId();
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
          const mappedChapters: CourseChaptersAccordion[] = [
            {
              chapterTitle: "Lessons",
              subchapters: responseData.lessons
                .sort((a, b) => a.lesson_no - b.lesson_no)
                .map((lesson) => ({
                  subchaptertitle: lesson.lesson_name,
                  lessonId: lesson.lesson_id,
                  isFinished: false,
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
      <div className="w-full bg-primary dark:bg-black h-10 rounded-t-lg flex items-center px-5">
        <h2 className="font-bold text-base md:text-xl text-secondary dark:text-primary">
          {data.courseTitle}
        </h2>
      </div>
      <div className="w-full h-fit flex flex-col lg:flex-row gap-10 lg:gap-0">
        <div className="w-full lg:w-3/4">
          <CourseChapterLessons lessonId={lessonId} />
          <div className="mt-4 flex justify-between">
            {!isFirstLesson ? (
              <Button onClick={() => changeProgress("backward")}>
                <ChevronLeft />
                Previous
              </Button>
            ) : (
              <div />
            )}
            {!isLastLesson ? (
              <Button onClick={() => changeProgress("forward")}>
                Next
                <ChevronRight />
              </Button>
            ) : (
              <div />
            )}
          </div>
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
