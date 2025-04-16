"use client";

import { Navbar } from "@/components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFile } from "react-icons/fa";

// --- Types
interface FileItem {
  id: string;
  file_name: string;
  file_url: string;
  file_owner: string;
  file_upload_date: Date;
  file_permission: "admin" | "instructor" | "everyone";
  file_type: string;
}

// --- Utilities
const extractFileExtension = (type: string): string => {
  if (type.includes("/")) return type.split("/")[1].toUpperCase();
  return type.toUpperCase();
};

const fetchFilesFromAPI = async (): Promise<FileItem[]> => {
  try {
    const response = await fetch(
      "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/file",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "get_files" }),
      }
    );

    const result = await response.json();
    const parsed = JSON.parse(result.body);

    if (!parsed.files || !Array.isArray(parsed.files))
      throw new Error("Invalid response format");

    return parsed.files.map((file: any) => ({
      id: String(file.file_id),
      file_name: file.file_name,
      file_url: file.file_url,
      file_owner: file.file_owner,
      file_upload_date: new Date(file.file_upload_date),
      file_permission: file.file_permission,
      file_type: extractFileExtension(file.file_type),
    }));
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};

// --- UI Components
const FileRow = ({ file }: { file: FileItem }) => {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-2xl" />;
      case "docx":
        return <FaFileWord className="text-blue-500 text-2xl" />;
      case "xlsx":
        return <FaFileExcel className="text-green-500 text-2xl" />;
      default:
        return <FaFile className="text-gray-500 text-2xl" />;
    }
  };

  const formattedDate = format(file.file_upload_date, "d MMM yyyy");

  return (
    <div className="flex items-center justify-between border-b p-4 hover:bg-muted/30">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center">
          {getFileIcon(file.file_type)}
        </div>
        <div>
          <p className="font-medium">{file.file_name}</p>
          <p className="text-sm text-muted-foreground">
            Uploaded {formattedDate}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline">{file.file_type}</Badge>
        <a
          href={file.file_url}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon">
            <Download className="h-5 w-5" />
          </Button>
        </a>
      </div>
    </div>
  );
};

// --- Page Component
export default function Page() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      const fetched = await fetchFilesFromAPI();
      setFiles(fetched);
      setLoading(false);
    };

    loadFiles();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="w-full px-10 lg:px-16 xl:px-28 py-32 mx-auto flex flex-col gap-10">
        <p className="font-bold text-3xl md:text-5xl text-primary">Files</p>
        <div className="w-full flex flex-col-reverse lg:flex-row gap-5">
          <div className="w-full bg-background rounded-md shadow">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Loading files...
              </div>
            ) : files.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No files available.
              </div>
            ) : (
              files.map((file) => <FileRow key={file.id} file={file} />)
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
