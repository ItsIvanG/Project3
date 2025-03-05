"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DeleteCourse from "./DeleteCourse";
import { PlusCircle } from "lucide-react";

export default function CourseTabs({ course }) {
  const [activeTab, setActiveTab] = useState("details");
  const [courseDetails, setCourseDetails] = useState(course || {});
  const [thumbnailPreview, setThumbnailPreview] = useState(
    course?.course_thumbnail || ""
  );

  const handleInputChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
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

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <p className=" text-2xl font-bold">{courseDetails.course_name}</p>
      {/* Tabs Navigation */}
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
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
              <Input
                id="expected_outcomes"
                name="expected_outcomes"
                value={courseDetails.expected_outcomes || ""}
                onChange={handleInputChange}
                placeholder="Enter expected outcomes"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <DeleteCourse courseId={courseDetails.course_id} />
              <Button>Save Changes</Button>
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
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Lessons</CardTitle>
              <Button variant="default">
                <PlusCircle />
                Add Lesson
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p>Manage course lessons and materials.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
