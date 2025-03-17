"use client";

import { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // ShadCN toast
const S3_BUCKET = "proj3files";
const REGION = "ap-southeast-1"; // e.g., "us-east-1"

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});
export default function S3Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

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
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async () => {
        try {
          const fileBuffer = fileReader.result as ArrayBuffer;

          const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: fileName,
            Body: fileBuffer,
            ContentType: file.type,
          });

          await s3Client.send(command);

          const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
          setUrl(fileUrl);

          toast({
            title: "Success",
            description: "File uploaded successfully!",
          });
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
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error",
        description: "File processing error!",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-md">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={uploadToS3} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {url && (
        <p>
          File uploaded:{" "}
          <a href={url} target="_blank" className="text-blue-500">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
