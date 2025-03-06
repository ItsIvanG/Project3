"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AddLessonDialog({ courseId = "", refreshLessons }) {
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonEstimatedTime, setLessonEstimatedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/init/lessons";

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const payload = {
      lesson_name: lessonName,
      course_id: courseId,
      lesson_description: lessonDescription,
      lesson_content: lessonContent,
      lesson_estimated_time: lessonEstimatedTime,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add lesson");
      }

      const data = await response.json();
      console.log("Lesson created:", data);

      // Reset form
      setLessonName("");
      setLessonDescription("");
      setLessonContent("");
      setLessonEstimatedTime("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
      refreshLessons();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Add Lesson
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Lesson</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new lesson.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Lesson Name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
        />
        {/* <Input
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          type="number"
        /> */}
        <Input
          placeholder="Description"
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
        />
        <Input
          placeholder="Content"
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
        />
        <Input
          placeholder="Estimated Time"
          value={lessonEstimatedTime}
          onChange={(e) => setLessonEstimatedTime(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Lesson"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
