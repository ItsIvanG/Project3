"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export default function DeleteLesson({
  lessonId = "",
  courseId = "",
  refreshLessons,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/init/lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ delete_lesson_id: lessonId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast({ title: "Lesson deleted successfully!" });
        // onDeleteSuccess(); // Refresh the course list or navigate away
        router.push(`panel/?id=${courseId}`);
        refreshLessons();
        setOpen(false);
      } else {
        toast({
          title: "Error deleting lesson",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        <Trash />
        Delete Lesson
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. Do you really want to delete this
            lesson?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
