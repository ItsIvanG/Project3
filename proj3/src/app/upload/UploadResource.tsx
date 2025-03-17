"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // ShadCN toast

const S3_BUCKET = "proj3files";
const REGION = "ap-southeast-1";

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

interface ChildProps {
  sendDataToParent: (data: string) => void;
}

export default function UploadResource({ sendDataToParent }: ChildProps) {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId"); // Extract lesson_id from URL

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToS3 = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file!",
        variant: "destructive",
      });
      return;
    }

    if (!lessonId) {
      toast({
        title: "Error",
        description: "Lesson ID not found in URL!",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const fileType = file.name.split(".").pop() || "unknown";
      const fileBuffer = await file.arrayBuffer();

      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      });

      await s3Client.send(command);

      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

      // Send data to API
      await sendResourceToAPI(file.name, fileType, fileUrl, Number(lessonId));

      sendDataToParent(fileUrl); // Send URL to parent component

      toast({ title: "Success", description: "File uploaded successfully!" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Upload failed!",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const sendResourceToAPI = async (
    fileName: string,
    fileType: string,
    fileUrl: string,
    lessonId: number
  ) => {
    try {
      const response = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/resource",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add_resource",
            data: {
              file_name: fileName,
              file_type: fileType,
              file_url: fileUrl,
              uploaded_by: 6, // Replace with dynamic user ID if applicable
              lesson_id: lessonId,
            },
          }),
        }
      );

      const result = await response.json();

      console.log("API response:", result);
      if (result.status !== "success") throw new Error("API request failed");

      toast({ title: "Success", description: "Resource added successfully!" });
    } catch (error) {
      console.error("API error:", error);
      toast({
        title: "Error",
        description: "Failed to save resource!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={uploadToS3} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
