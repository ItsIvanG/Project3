"use client";

import { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function UploadProfilePicture({ sendDataToParent }: ChildProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const accountId = useUserStore((state) => state.accountId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToS3 = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a profile picture!",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileName = `avatar-${accountId}-${Date.now()}-${file.name}`;
      const fileBuffer = await file.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      });

      await s3Client.send(command);

      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

      await sendProfileToAPI(fileUrl);

      //   sendDataToParent(fileUrl);

      toast({ title: "Success", description: "Profile picture uploaded!" });
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

  const sendProfileToAPI = async (fileUrl: string) => {
    try {
      const response = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/edit_user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            edit_user_avatar_id: accountId,
            profile_picture: fileUrl,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "API request failed");
      }

      toast({
        title: "Success",
        description: "Profile picture updated in API!",
      });
    } catch (error) {
      console.error("API error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile picture!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={uploadToS3} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
