"use client";
import { useState } from "react";
import CourseInfosCard from "./CourseInfosCard";
import type {
  CourseInfoCard,
  CourseProgressProps,
  CourseTimeline,
  OverallProgress,
} from "@/lib/definitions";
import { courseProgressData } from "@/app/constants";
import CourseResource from "./CourseResource";
import { Progress } from "./ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import { TbClockHour5 } from "react-icons/tb";
import { MdOutlineAssignment, MdSignalCellularAlt } from "react-icons/md";
import Link from "next/link";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { cn } from "@/lib/utils";

function OverallProgressComponent({
  overallProgress,
  chaptersProgress,
}: OverallProgress) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-row justify-between items-center gap-5">
        <Progress value={overallProgress} className="h-2 flex-1" />
        <span className="font-bold text-3xl lg:text-4xl">
          {overallProgress}%
        </span>
      </div>

      {/* Timeline Section */}
      <div className="relative ">
        {/* Vertical timeline line */}
        <div className="absolute left-[120px] top-6 bottom-6 w-0.5 bg-primary/10"></div>

        {/* Chapter progress items */}
        <div className="space-y-8 ">
          {chaptersProgress.map((chapter, index) => (
            <div key={index} className="flex items-start ">
              {/* Date column - fixed width to prevent layout shifts */}
              <div className="w-[90px] flex-shrink-0 text-right text-xs sm:text-sm md:text-base text-primary">
                {chapter.dateFinished ? (
                  <>
                    <div>
                      {new Date(chapter.dateFinished).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "2-digit",
                        }
                      )}
                    </div>
                    <div className="text-[10px] sm:text-sm text-muted-foreground">
                      {chapter.timeFinished}
                    </div>
                  </>
                ) : (
                  <div className="h-10"></div> // Empty space for alignment
                )}
              </div>

              {/* Status indicator - fixed position */}
              <div className="w-[60px] flex justify-center relative z-10 mt-3">
                {chapter.isFinished ? (
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-100 fill-green-100 dark:fill-green-500" />
                ) : index ===
                  chaptersProgress.findIndex((c) => !c.isFinished) ? (
                  <Circle className="h-5 w-5 text-green-500 dark:text-green-100" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 dark:text-green-500" />
                )}
              </div>

              {/* Chapter info - consistent positioning */}
              <div className="flex-1 text-xs sm:text-sm md:text-base text-primary">
                <p className="font-semibold text-primary">
                  {chapter.chapterTitle}
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground">
                  {chapter.estHoursToFinish} hr
                  {chapter.estHoursToFinish !== "1" && "s"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseDetails({
  estimatedHoursToFinish,
  level,
  noOfLabs, //if meron
  achievementBadgesIconSrc,
  instructor,
}: CourseInfoCard) {
  return (
    <div className="w-full flex flex-col bg-card rounded-lg p-10 shadow justify-center items-center gap-8">
      <div className="w-full flex flex-row justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-1">
          <TbClockHour5 className="w-9 h-9 text-primary" />
          <span className="text-primary font-semibold text-xs sm:text-sm text-center">
            {estimatedHoursToFinish} HOURS
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <MdSignalCellularAlt className="w-9 h-9 text-primary" />
          <span className="text-primary font-semibold text-xs sm:text-sm text-center">
            {level}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <MdOutlineAssignment className="w-9 h-9 text-primary" />
          <span className="text-primary font-semibold text-xs sm:text-sm text-center">
            {noOfLabs} LABS
          </span>
        </div>
      </div>
      <div className="w-full border border-t-primary/10"></div>
      <div className="w-full flex flex-col justify-center items-start">
        <p className="text-primary font-semibold text-xs sm:text-sm md:text-base">
          Achievements
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Certificates you can earn in this course
        </p>
        <div className="flex flex-row gap-3 mt-2 justify-center items-start">
          {achievementBadgesIconSrc.map((badge, index) => (
            <div key={index} className="w-14 h-14">
              <img
                src={badge}
                alt={`Badge ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border border-t-primary/10"></div>
      <div className="w-full flex flex-col justify-center items-start">
        <p className="text-primary font-semibold text-xs sm:text-sm md:text-base">
          Instructor
        </p>
        <div className="flex flex-row gap-3 mt-2 justify-center items-start">
          {[instructor].map(({ instructorName, profileSrc }, index) => (
            <div
              key={index}
              className="flex flex-row items-center text-center gap-3"
            >
              <img
                src={profileSrc}
                alt={instructorName}
                className="object-contain w-9 h-9 rounded-full"
              />
              <span className="text-primary text-xs sm:text-sm md:text-base">
                {instructorName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Timeline({ onlineMeetings, currentDate }: CourseTimeline) {
  // If currentDate is not provided, use the date of the first meeting
  const firstMeeting = new Date(onlineMeetings[0]);
  const weekStart = startOfWeek(currentDate || firstMeeting, {
    weekStartsOn: 1,
  }); // Start from Monday

  // Generate array of 7 days starting from weekStart
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Convert meeting strings to Date objects
  const meetingDates = onlineMeetings.map((meeting) => new Date(meeting));

  return (
    <div className="w-full rounded-lg overflow-hidden shadow">
      {/* Header with dates */}
      <div className="bg-primary text-secondary font-semibold grid grid-cols-7 text-sm">
        {days.map((day, i) => (
          <div key={i} className="px-2 py-3 text-center font-semibold">
            {format(day, "dd")}
          </div>
        ))}
      </div>

      {/* Timeline body */}
      <div className="grid grid-cols-7 bg-card h-80 relative">
        {days.map((day, i) => {
          const hasEvent = meetingDates.some((meeting) =>
            isSameDay(meeting, day)
          );
          const event = meetingDates.find((meeting) => isSameDay(meeting, day));

          return (
            <div
              key={i}
              className={cn(
                "border-r  relative",
                i === days.length - 1 && "border-r-0"
              )}
            >
              {hasEvent && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-secondary text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {format(event!, "MMM. dd")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CourseProgress() {
  const [data, setData] = useState<CourseProgressProps>(courseProgressData);
  //api call here

  //destructure data
  const {
    courseInfoHeader,
    overallProgress,
    courseInfoCard,
    courseMeetings,
    courseResources,
  } = data;

  return (
    <div className="bg-secondary px-4 md:px-10 lg:px-16 xl:px-28 py-32 w-full mx-auto flex flex-col gap-10 md:gap-20">
      <CourseInfosCard
        id={courseInfoHeader.id}
        title={courseInfoHeader.title}
        rating={courseInfoHeader.rating}
        totalRatings={courseInfoHeader.totalRatings}
        lessons={courseInfoHeader.lessons}
        students={courseInfoHeader.students}
        category={courseInfoHeader.category}
        price={courseInfoHeader.price}
        description={courseInfoHeader.description}
        instructor={courseInfoHeader.instructor}
        isOngoing={true} // Change this based on the actual course status
        createdAt={""}
      />
      <div className="w-full flex flex-col lg:flex-row gap-10 md:gap-20 justify-center">
        <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col">
          <p className="font-bold text-xl md:text-3xl text-primary mb-5">
            Overall Progress
          </p>
          <OverallProgressComponent {...overallProgress} />
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3">
          <CourseDetails {...courseInfoCard} />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <p className="font-bold text-xl md:text-3xl text-primary mb-5">
          Online Meetings
        </p>
        <div className="flex flex-col items-end mb-5">
          <Link
            href=""
            className="inline-block text-sm sm:text-md lg:text-lg font-bold bg-primary text-secondary rounded-full px-14 py-1"
          >
            Zoom link
          </Link>
        </div>
        <Timeline {...courseMeetings} />
      </div>
      <div className="w-full flex flex-col">
        {/* <p className="font-bold text-xl md:text-3xl text-primary mb-5">
          Resources
        </p> */}
        {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
          {courseResources.map(({ title, createdAt, type }, index) => {
            return (
              <CourseResource
                key={index}
                title={title}
                createdAt={createdAt}
                type={type}
                url={""}
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
