"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import CourseResource from "./CourseResource";

export default function CourseChapterLessons() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson_id"); // Extract lesson_id from URL

  const [lessonData, setLessonData] = useState({
    subChaptertitle: "Loading...",
    subChaptercontent: "Fetching lesson content...",
    lessonVideo: "",
  });

  const [resources, setResources] = useState([]); // Store lesson resources

  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        const response = await fetch(
          "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/lessons",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ get_lesson_id: Number(lessonId) }),
          }
        );

        const responseData = await response.json();

        if (responseData.status === "success" && responseData.lesson) {
          setLessonData({
            subChaptertitle: responseData.lesson.lesson_name,
            subChaptercontent:
              responseData.lesson.lesson_content || "No content available.",
            lessonVideo: responseData.lesson.lesson_video || "",
          });

          setResources(responseData.resources || []); // Store lesson resources
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setLessonData({
          subChaptertitle: "Error",
          subChaptercontent: "Failed to load lesson content.",
          lessonVideo: "",
        });
      }
    };

    fetchLesson();
  }, [lessonId]);

  return (
    <div className="w-full flex flex-col bg-card">
      {/* Course Heading */}
      <div className="relative h-[200px] md:h-[300px] lg:h-[400px] w-full">
        <img
          src={"/course1.jpeg"}
          className="w-full h-full object-cover"
          alt="Course Cover"
        />
        <div className="w-full absolute bottom-0 left-0 bg-primary/50 py-2 px-5 sm:py-3 lg:py-5 lg:px-10 flex flex-col gap-1 md:gap-4">
          <span className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-secondary shadow">
            {lessonData.subChaptertitle}
          </span>
          <span className="text-xs text-secondary flex flex-row items-center gap-2">
            Scroll to begin{" "}
            <IoIosArrowDropdownCircle className="text-secondary/50" />
          </span>
        </div>
      </div>

      {/* Video Player */}
      {lessonData.lessonVideo && (
        <div className="w-full flex justify-center mt-5">
          <video
            className="w-full max-w-4xl rounded-lg shadow-lg"
            controls
            src={lessonData.lessonVideo}
          />
        </div>
      )}

      {/* Course Content */}
      <div className="w-full flex flex-col bg-card p-5 sm:p-10 gap-16 rounded-none lg:rounded-bl-lg shadow">
        <div className="w-full flex flex-col">
          <span className="text-primary text-lg md:text-2xl font-semibold">
            {lessonData.subChaptertitle}
          </span>
          <span className="text-primary text-sm md:text-base py-5 md:p-5 lg:p-10 leading-relaxed text-justify">
            {lessonData.subChaptercontent}
          </span>

          {/* Resources Section */}
          {resources.length > 0 && (
            <div className="grid grid-cols-2 gap-5">
              {resources.map((resource) => (
                <CourseResource
                  key={resource.resource_id}
                  title={resource.file_name}
                  createdAt={new Date(
                    resource.uploaded_on
                  ).toLocaleDateString()}
                  type={resource.file_type}
                  url={resource.file_url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
