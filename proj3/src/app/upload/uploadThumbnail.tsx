"use client";

import { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // ShadCN toast
import Image from "next/image";

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

export default function UploadThumbnail({ sendDataToParent }: ChildProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validate file type (must be an image)
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid File",
          description: "Only image files are allowed!",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadToS3 = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select an image!",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const fileBuffer = await file.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      });

      await s3Client.send(command);

      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
      setUrl(fileUrl);
      sendDataToParent(fileUrl);

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });

      setPreview(null);
      setFile(null);
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

  return (
    <div className="flex flex-col gap-4">
      {/* Image Preview */}
      {preview && (
        <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
          <Image src={preview} alt="Preview" layout="fill" objectFit="cover" />
        </div>
      )}

      <div className="flex gap-2">
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button onClick={uploadToS3} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}
