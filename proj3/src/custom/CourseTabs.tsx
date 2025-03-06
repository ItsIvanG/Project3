"use client";

import { Fragment, use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DeleteCourse from "./DeleteCourse";
import { ChevronLeft, PlusCircle, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LessonCard from "./LessonCard";
import AddLessonDialog from "./AddLessonDialog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DeleteLesson from "./DeleteLesson";
import { Textarea } from "@/components/ui/textarea";

export default function CourseTabs({ course }) {
  const [activeTab, setActiveTab] = useState("details");
  const [courseDetails, setCourseDetails] = useState(course || {});
  const [thumbnailPreview, setThumbnailPreview] = useState(
    course?.course_thumbnail || ""
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId"); // Get course ID from URL
  const [lessons, setLessons] = useState([]);
  const [lessonDetails, setLessonDetails] = useState({
    lessonDetails: {
      lesson_name: "",
      lesson_description: "",
    },
  });
  const courseId = courseDetails.course_id;

  const handleInputChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleLessonInputChange = (e) => {
    const { name, value } = e.target;

    setLessonDetails((prevDetails) => ({
      ...prevDetails,
      lessonDetails: {
        ...prevDetails.lessonDetails,
        [name]: value,
      },
    }));
  };

  const setEditingLesson = (lesson) => {
    setLessonDetails(lesson);
    console.log("Editing lesson", lesson);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ get_lessons_from_course_id: courseId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }
      const responseData = await response.json();
      const lessons = responseData.lessons || [];
      setLessons(lessons);
      console.log("Lessons fetched", lessons);
    } catch (error) {
      console.error("Error fetching lessons", error);
    }
  };
  const handleCourseEdit = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/courses",
        {
          method: "POST", // Ensure the method is POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseDetails), // Stringify the data to send as JSON
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      const responseData = await response.json(); // Parse the JSON response
      const parsedBody = responseData.body ? JSON.parse(responseData.body) : {};

      toast({
        title: parsedBody.message,
      });
      console.log("Course details edited", responseData);
    } catch (error) {
      console.error("Error editing Course details", error);
    }
  };

  const handleLessonEdit = async () => {
    try {
      const payload = {
        ...lessonDetails.lessonDetails, // Spread existing lessonDetails
        edit_lesson_id: lessonDetails.lessonDetails.lesson_id, // Add edit_lesson_id field
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send combined JSON payload
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit Lessons");
      }
      const responseData = await response.json();
      console.log("Raw responseData:", responseData); // Debugging step

      // Ensure we get the correct JSON format
      const parsedBody = responseData.body
        ? typeof responseData.body === "string"
          ? JSON.parse(responseData.body)
          : responseData.body
        : responseData;

      console.log("Parsed response body:", parsedBody); // Debugging step

      // Display toast based on API response
      toast({
        title: parsedBody.status === "success" ? "Success" : "Error",
        description: parsedBody.message || "Unexpected response",
        variant: parsedBody.status === "success" ? "default" : "destructive",
      });
      fetchLessons();
      console.log("Lesson details edited", responseData);
    } catch (error) {
      console.error("Error editing Lesson details", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <p className=" text-2xl font-bold">{courseDetails.course_name}</p>
      {/* Tabs Navigation */}
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>

      {/* Details Tab */}
      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="course_name">Course Name</Label>
              <Input
                id="course_name"
                name="course_name"
                value={courseDetails.course_name || ""}
                onChange={handleInputChange}
                placeholder="Enter course name"
              />
            </div>

            <div>
              <Label htmlFor="course_description">Description</Label>
              <Input
                id="course_description"
                name="course_description"
                value={courseDetails.course_description || ""}
                onChange={handleInputChange}
                placeholder="Enter course description"
              />
            </div>

            {/* Course Thumbnail Input */}
            <div>
              <Label htmlFor="course_thumbnail">Course Thumbnail</Label>
              <Input
                id="course_thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              {thumbnailPreview && (
                <div className="mt-4">
                  <Image
                    src={thumbnailPreview}
                    alt="Course Thumbnail"
                    width={200}
                    height={100}
                    className="rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Expected Outcomes */}
            <div>
              <Label htmlFor="expected_outcomes">Expected Outcomes</Label>
              <Textarea
                id="expected_outcomes"
                name="expected_outcomes"
                value={courseDetails.expected_outcomes || ""}
                onChange={handleInputChange}
                className="h-40"
                placeholder={`Enter expected outcomes.\nE.g. By the end of this course, you will be able to...\n• Write basic Python programs\n• Understand the fundamentals of data structures`}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-2 sm:justify-end space-y-2 sm:space-y-0">
              <DeleteCourse courseId={courseDetails.course_id} />
              <Button onClick={handleCourseEdit}>
                <Save /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Course Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track student progress, engagement, and other metrics.</p>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Students Tab */}
      <TabsContent value="students">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p>List of students enrolled in this course.</p>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Lessons Tab */}
      <TabsContent value="lessons">
        <Card>
          {lessonId ? (
            <Fragment>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => router.push(`panel/?id=${courseId}`)}
                    >
                      <ChevronLeft />
                      Back to lessons
                    </Button>
                    <span className="text-lg font-medium">
                      {lessonDetails.lessonDetails?.lesson_name}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lesson_name">Lesson Name</Label>
                  <Input
                    id="lesson_name"
                    name="lesson_name"
                    value={lessonDetails.lessonDetails.lesson_name || ""}
                    onChange={handleLessonInputChange}
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <Label htmlFor="lesson_description">Lesson Description</Label>
                  <Input
                    id="lesson_description"
                    name="lesson_description"
                    value={lessonDetails.lessonDetails.lesson_description || ""}
                    onChange={handleLessonInputChange}
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <Label htmlFor="lesson_content">Lesson Content</Label>
                  <Textarea
                    id="lesson_content"
                    name="lesson_content"
                    value={lessonDetails.lessonDetails.lesson_content || ""}
                    onChange={handleLessonInputChange}
                    placeholder={`E.g. This module, Introduction to Programming, is essential for anyone looking to develop problem-solving skills and logical thinking through coding. It provides the fundamental knowledge needed to understand how computers execute instructions, enabling you to write, analyze, and improve simple programs. `}
                    className="h-40"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-2 sm:justify-end space-y-2 sm:space-y-0">
                  <DeleteLesson
                    lessonId={lessonId}
                    courseId={courseId}
                    refreshLessons={fetchLessons}
                  />
                  <Button onClick={handleLessonEdit}>
                    <Save /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Fragment>
          ) : (
            <Fragment>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Lessons</CardTitle>
                  <AddLessonDialog
                    courseId={courseId}
                    refreshLessons={fetchLessons}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p>Manage course lessons and materials.</p>
                <div className=" space-y-5 mt-5">
                  {" "}
                  {lessons && lessons.length > 0 ? (
                    lessons.map((lesson) => (
                      <LessonCard
                        key={lesson.lesson_id}
                        lessonId={lesson.lesson_id}
                        lessonNo={lesson.lesson_no} // Assuming lesson_no should be lesson_id
                        lessonTitle={lesson.lesson_name} // Corrected to lesson_name
                        id={courseId}
                        refreshLessons={fetchLessons}
                        setEditingLesson={setEditingLesson}
                        lessonDetails={lesson}
                      />
                    ))
                  ) : (
                    <p>No lessons found.</p>
                  )}
                </div>
              </CardContent>
            </Fragment>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
