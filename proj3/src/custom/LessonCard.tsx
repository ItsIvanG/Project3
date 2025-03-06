"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LessonCard = ({
  lessonNo = "",
  lessonTitle = "",
  id = "",
  lessonId = "",
  refreshLessons,
  setEditingLesson,
  lessonDetails,
}) => {
  const handleEdit = () => {
    toast({ title: "Edit lesson", description: `Editing lesson ${lessonNo}` });
  };

  const router = useRouter();

  const handleNavigation = () => {
    console.log("Navigating to lesson", lessonDetails);
    setEditingLesson({ lessonDetails });

    router.push(`/instructor/panel?id=${id}&lessonId=${lessonId}`);
  };

  const handleUpLesson = async () => {
    try {
      // API call to move lesson up
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            up_lesson_no: lessonNo,
            course_id: id,
            lesson_id: lessonId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move lesson up");
      }
      toast({
        title: "Lesson moved",
        description: `Lesson ${lessonNo} moved up`,
      });
      refreshLessons();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownLesson = async () => {
    try {
      // API call to move lesson down
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            down_lesson_no: lessonNo,
            course_id: id,
            lesson_id: lessonId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move lesson down");
      }
      toast({
        title: "Lesson moved",
        description: `Lesson ${lessonNo} moved down`,
      });
      refreshLessons();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="my-4">
      <div className="relative flex items-center p-4 border rounded-lg">
        {/* Clickable overlay */}
        <div
          onClick={handleNavigation}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Lesson Details */}
        <div>
          <h2 className="text-xl font-semibold">Lesson {lessonNo}:</h2>
          <h3 className="text-gray-600">{lessonTitle}</h3>
        </div>

        {/* Buttons (should not trigger handleNavigation) */}
        <div className="ml-auto grid grid-cols-2 gap-2 relative z-10">
          <Button onClick={handleUpLesson} variant="outline" size="sm">
            <ArrowUp />
          </Button>
          <Button onClick={handleDownLesson} variant="outline" size="sm">
            <ArrowDown />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
