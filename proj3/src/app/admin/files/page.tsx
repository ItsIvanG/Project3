"use client";

import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  MoreVertical,
  Download,
  Trash2,
  Users,
  UserCog,
  User,
  Edit,
  Check,
  X,
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar";
import { useUserStore } from "@/store";
import UserBadge from "@/custom/UserBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFile } from "react-icons/fa";
import UploadFile from "@/app/upload/UploadFile";
import { toast } from "@/hooks/use-toast";

// File type definition
interface FileItem {
  id: string;
  file_name: string;
  file_url: string;
  file_owner: string;
  file_upload_date: Date;
  file_permission: "admin" | "instructor" | "everyone";
  file_type: string;
}

// Sample data
const sampleFiles: FileItem[] = [
  {
    id: "1",
    file_name: " ",
    file_url: " ",
    file_owner: " ",
    file_upload_date: new Date("2024-12-20"),
    file_permission: " ",
    file_type: " ",
  },
];

//start

export const fetchFilesFromAPI = async (): Promise<FileItem[]> => {
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

    if (!parsed.files || !Array.isArray(parsed.files)) {
      throw new Error("Invalid response format");
    }

    const files: FileItem[] = parsed.files.map((file: any) => ({
      id: String(file.file_id),
      file_name: file.file_name,
      file_url: file.file_url,
      file_owner: file.file_owner,
      file_upload_date: new Date(file.file_upload_date),
      file_permission: file.file_permission,
      file_type: extractFileExtension(file.file_type),
    }));

    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};

const extractFileExtension = (type: string): string => {
  if (type.includes("/")) {
    return type.split("/")[1].toUpperCase();
  }
  return type.toUpperCase();
};
//END

export const deleteFileFromAPI = async (fileId: string): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/file",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "delete", file_id: fileId }),
      }
    );

    const result = await response.json();
    const parsed = JSON.parse(result.body);

    return parsed.success || false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

export const updateFilePermission = async (
  fileId: string,
  newPermission: "admin" | "instructor" | "everyone"
): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/file",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "set_permission",
          file_id: fileId,
          new_permission: newPermission,
        }),
      }
    );

    const result = await response.json();
    const parsed = JSON.parse(result.body);
    toast({
      title: "Success",
      description: `File permission updated to ${newPermission}`,
    });
    return parsed.success || false;
  } catch (error) {
    // console.error("Error updating file permission:", error);
    return false;
  }
};

export const renameFileInAPI = async (
  fileId: string,
  newName: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/file",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "rename",
          file_id: fileId,
          new_name: newName,
        }),
      }
    );

    const result = await response.json();
    const parsed = JSON.parse(result.body);

    if (parsed.success) {
      toast({
        title: "File Renamed",
        description: `File has been renamed to "${newName}"`,
      });
    }

    return parsed.success || false;
  } catch (error) {
    console.error("Error renaming file:", error);
    toast({
      title: "Rename Failed",
      description: "Something went wrong while renaming the file.",
      variant: "destructive",
    });
    return false;
  }
};

// Permission icon mapping
const permissionIcons = {
  admin: <UserCog className="h-4 w-4 mr-2" />,
  instructor: <User className="h-4 w-4 mr-2" />,
  everyone: <Users className="h-4 w-4 mr-2" />,
};

// File item component
const FileItem = ({
  file,
  onPermissionChange,
  onRename,
  isRenaming,
  setRenamingId,
  onDelete, // <-- added
}: {
  file: FileItem;
  onPermissionChange: (
    fileId: string,
    permission: "admin" | "instructor" | "everyone"
  ) => void;
  onRename: (fileId: string, newName: string) => void;
  isRenaming: boolean;
  setRenamingId: (id: string | null) => void;
  onDelete: (fileId: string) => void; // <-- added
}) => {
  const [newFileName, setNewFileName] = useState(file.file_name);

  // Function to get file icon based on file type
  const getFileIcon = (fileType: string): JSX.Element => {
    switch (fileType.toLowerCase()) {
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

  // Format date to display
  const formattedDate = format(file.file_upload_date, "d MMM yyyy");
  const isToday =
    format(file.file_upload_date, "yyyy-MM-dd") ===
    format(new Date(), "yyyy-MM-dd");
  const dateDisplay = isToday
    ? `Today, ${format(file.file_upload_date, "d MMM yyyy")}`
    : formattedDate;

  // Handle save rename
  const handleSaveRename = () => {
    onRename(file.id, newFileName);
    setRenamingId(null);
  };

  // Handle cancel rename
  const handleCancelRename = () => {
    setNewFileName(file.file_name);
    setRenamingId(null);
  };

  // Handle key press for rename input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveRename();
    } else if (e.key === "Escape") {
      handleCancelRename();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-4">
        {/* <div className='w-10 h-10 flex-shrink-0'>
          <Image
            src={getFileIcon(file.file_type) || '/placeholder.svg'}
            alt={file.file_type}
            width={40}
            height={40}
            className='object-contain'
          />
        </div> */}
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          {getFileIcon(file.file_type)}
        </div>
        <div className="max-w-md">
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="h-8 py-1"
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSaveRename}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCancelRename}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <h3 className="text-base font-medium">{file.file_name}</h3>
          )}
          <p className="text-xs text-muted-foreground">
            Uploaded {dateDisplay}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {file.file_owner}
        </span>

        <Badge variant="outline" className="hidden sm:flex">
          {file.file_type}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setRenamingId(file.id)}>
              <Edit className="h-4 w-4 mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href={file.file_url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center  text-sm cursor-pointer hover:bg-muted w-full"
              >
                <Download className="h-4 w-4 mr-4" /> Download
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {permissionIcons[file.file_permission]} Permissions:{" "}
                {file.file_permission}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => onPermissionChange(file.id, "admin")}
                  >
                    <UserCog className="h-4 w-4 mr-2" /> Admin only
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onPermissionChange(file.id, "instructor")}
                  >
                    <User className="h-4 w-4 mr-2" /> Instructor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onPermissionChange(file.id, "everyone")}
                  >
                    <Users className="h-4 w-4 mr-2" /> Everyone
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(file.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default function Page() {
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);

  // File list state
  const [files, setFiles] = React.useState<FileItem[]>(sampleFiles);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshFiles = async () => {
    const fetchedFiles = await fetchFilesFromAPI();
    console.log("Files refreshed");
    setFiles(fetchedFiles);
  };

  useEffect(() => {
    const loadFiles = async () => {
      setIsLoading(true);
      const fetchedFiles = await fetchFilesFromAPI();
      setIsLoading(false);
      setFiles(fetchedFiles);
      console.log("User role: ", role);
    };

    loadFiles();
  }, [role]);

  // Handle permission change
  const handlePermissionChange = async (
    fileId: string,
    permission: "admin" | "instructor" | "everyone"
  ) => {
    const success = await updateFilePermission(fileId, permission);
    // if (success) {
    setFiles(
      files.map((file) =>
        file.id === fileId ? { ...file, file_permission: permission } : file
      )
    );
    // } else {
    // console.error("Failed to update permission");
    // }
  };

  // Handle rename
  const handleRename = async (fileId: string, newName: string) => {
    const success = await renameFileInAPI(fileId, newName);
    // if (success) {
    setFiles((files) =>
      files.map((file) =>
        file.id === fileId ? { ...file, file_name: newName } : file
      )
    );
    // }
  };

  const handleDelete = async (fileId: string) => {
    const success = await deleteFileFromAPI(fileId);
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <Fragment>
      <div className="m-10">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex w-full flex-col">
            <div className="flex justify-between items-center">
              <SidebarTrigger />
              <UserBadge name={name} pic="hahah" role={role} />
            </div>

            <div className="flex items-center justify-between mt-5 mb-6">
              <h1 className="text-3xl font-bold">Files</h1>
              <UploadFile sendDataToParent={refreshFiles} />
            </div>

            {/* File List */}
            <div className="w-full bg-background rounded-md shadow">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Loading files...
                </div>
              ) : files.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No files found.
                </div>
              ) : (
                <div>
                  {files
                    .filter(
                      (file) =>
                        file.file_permission === "everyone" ||
                        file.file_permission === role
                    )
                    .map((file) => (
                      <FileItem
                        key={file.id}
                        file={file}
                        onPermissionChange={handlePermissionChange}
                        onRename={handleRename}
                        isRenaming={renamingId === file.id}
                        setRenamingId={setRenamingId}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              )}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
