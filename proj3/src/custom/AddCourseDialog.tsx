"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store"; // Store to get instructor ID
import { toast } from "@/hooks/use-toast"; // ShadCN toast
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddCourseDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_description: "",
    expected_outcomes: "",
    price: "",
    course_estimated_time: "",
    thumbnail: "",
    course_zoom_link: "https://zoom.us/",
  });

  const instructorId = useUserStore((state) => state.roleId); // Get instructor ID from store

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!instructorId) {
      toast({
        title: "Error",
        description: "Instructor ID not found.",
        variant: "destructive",
      });
      return;
    }

    const requestData = { ...courseData, created_by_instructor: instructorId };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/courses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Course added successfully!",
          variant: "default",
        });

        location.reload(); // Refresh the page
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: responseData?.message || "Failed to add course.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast({
        title: "Error",
        description: "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle /> Add Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-semibold">Add New Course</h2>
        </DialogHeader>
        <Input
          name="course_name"
          placeholder="Course Name"
          onChange={handleChange}
        />
        <Textarea
          name="course_description"
          placeholder="Course Description"
          onChange={handleChange}
        />
        <Textarea
          name="expected_outcomes"
          placeholder="Expected Outcomes"
          onChange={handleChange}
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
        />
        <Input
          name="course_estimated_time"
          placeholder="Estimated Time (e.g., 10 hours)"
          onChange={handleChange}
        />
        <Input
          name="thumbnail"
          placeholder="Thumbnail URL"
          onChange={handleChange}
        />
        <Input
          name="course_zoom_link"
          placeholder="Zoom Link (Optional)"
          onChange={handleChange}
          defaultValue="https://zoom.us/"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
