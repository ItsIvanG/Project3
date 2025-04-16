"use client";

import { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store";

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

export default function UploadFileModal({ sendDataToParent }: ChildProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const roleId = useUserStore((state) => state.roleId);

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

    setUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const fileType = file.name.split(".").pop() || "unknown";
      const fileBuffer = await file.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      });

      await s3Client.send(command);

      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

      await sendFileToAPI(file.name, fileType, fileUrl);

      sendDataToParent(fileUrl);
      setOpen(false);

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

  const sendFileToAPI = async (
    fileName: string,
    fileType: string,
    fileUrl: string
  ) => {
    try {
      const response = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/file",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operation: "create",
            file_name: fileName,
            file_type: `application/${fileType}`,
            file_url: fileUrl,
            file_owner: roleId, // Update dynamically if needed
            file_permission: "everyone",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "API request failed");
      }

      toast({ title: "Success", description: "File metadata saved to API!" });
    } catch (error) {
      console.error("API error:", error);
      toast({
        title: "Error",
        description: "Failed to save file metadata!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File to Repository</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mt-4">
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={uploadToS3} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
