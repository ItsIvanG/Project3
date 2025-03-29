'use client';

import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
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
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/instructor-sidebar';
import { useUserStore } from '@/store';
import UserBadge from '@/custom/UserBadge';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFile } from 'react-icons/fa';

// File type definition
interface FileItem {
  id: string;
  file_name: string;
  file_url: string;
  file_owner: string;
  file_upload_date: Date;
  file_permission: 'admin' | 'instructor' | 'everyone';
  file_type: string;
}

// Sample data
const sampleFiles: FileItem[] = [
  {
    id: '1',
    file_name: 'Create Followup Call to Tazkia Foundation.pdf',
    file_url: 'https://example.com/files/tazkia-foundation.pdf',
    file_owner: 'Sarah Johnson',
    file_upload_date: new Date('2024-12-20'),
    file_permission: 'admin',
    file_type: 'PDF',
  },
  {
    id: '2',
    file_name: 'Course Syllabus - Introduction to Programming.docx',
    file_url: 'https://example.com/files/syllabus.docx',
    file_owner: 'Michael Chen',
    file_upload_date: new Date('2024-12-18'),
    file_permission: 'instructor',
    file_type: 'DOCX',
  },
  {
    id: '3',
    file_name: 'Student Handbook 2024-2025.pdf',
    file_url: 'https://example.com/files/handbook.pdf',
    file_owner: 'Emily Rodriguez',
    file_upload_date: new Date('2024-12-15'),
    file_permission: 'everyone',
    file_type: 'PDF',
  },
  {
    id: '4',
    file_name: 'Final Exam Schedule.xlsx',
    file_url: 'https://example.com/files/exam-schedule.xlsx',
    file_owner: 'David Wilson',
    file_upload_date: new Date('2024-12-10'),
    file_permission: 'instructor',
    file_type: 'XLSX',
  },
];

// Permission icon mapping
const permissionIcons = {
  admin: <UserCog className='h-4 w-4 mr-2' />,
  instructor: <User className='h-4 w-4 mr-2' />,
  everyone: <Users className='h-4 w-4 mr-2' />,
};

// File item component
const FileItem = ({
  file,
  onPermissionChange,
  onRename,
  isRenaming,
  setRenamingId,
}: {
  file: FileItem;
  onPermissionChange: (
    fileId: string,
    permission: 'admin' | 'instructor' | 'everyone'
  ) => void;
  onRename: (fileId: string, newName: string) => void;
  isRenaming: boolean;
  setRenamingId: (id: string | null) => void;
}) => {
  const [newFileName, setNewFileName] = useState(file.file_name);

  // Function to get file icon based on file type
  const getFileIcon = (fileType: string): JSX.Element => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FaFilePdf className='text-red-500 text-2xl' />;
      case 'docx':
        return <FaFileWord className='text-blue-500 text-2xl' />;
      case 'xlsx':
        return <FaFileExcel className='text-green-500 text-2xl' />;
      default:
        return <FaFile className='text-gray-500 text-2xl' />;
    }
  };

  // Format date to display
  const formattedDate = format(file.file_upload_date, 'd MMM yyyy');
  const isToday =
    format(file.file_upload_date, 'yyyy-MM-dd') ===
    format(new Date(), 'yyyy-MM-dd');
  const dateDisplay = isToday
    ? `Today, ${format(file.file_upload_date, 'd MMM yyyy')}`
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
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      handleCancelRename();
    }
  };

  return (
    <div className='flex items-center justify-between p-4 border-b hover:bg-muted/30 transition-colors'>
      <div className='flex items-center space-x-4'>
        {/* <div className='w-10 h-10 flex-shrink-0'>
          <Image
            src={getFileIcon(file.file_type) || '/placeholder.svg'}
            alt={file.file_type}
            width={40}
            height={40}
            className='object-contain'
          />
        </div> */}
        <div className='w-10 h-10 flex-shrink-0 flex items-center justify-center'>
          {getFileIcon(file.file_type)}
        </div>
        <div className='max-w-md'>
          {isRenaming ? (
            <div className='flex items-center gap-2'>
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={handleKeyPress}
                className='h-8 py-1'
                autoFocus
              />
              <Button
                size='icon'
                variant='ghost'
                onClick={handleSaveRename}
                className='h-8 w-8'
              >
                <Check className='h-4 w-4' />
              </Button>
              <Button
                size='icon'
                variant='ghost'
                onClick={handleCancelRename}
                className='h-8 w-8'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ) : (
            <h3 className='text-base font-medium'>{file.file_name}</h3>
          )}
          <p className='text-xs text-muted-foreground'>
            Uploaded {dateDisplay}
          </p>
        </div>
      </div>

      <div className='flex items-center space-x-10'>
        <span className='text-sm text-muted-foreground hidden sm:inline'>
          {file.file_owner}
        </span>

        <Badge variant='outline' className='hidden sm:flex'>
          {file.file_type}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <MoreVertical className='h-5 w-5' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setRenamingId(file.id)}>
              <Edit className='h-4 w-4 mr-2' /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className='h-4 w-4 mr-2' /> Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {permissionIcons[file.file_permission]} Permissions:{' '}
                {file.file_permission}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => onPermissionChange(file.id, 'admin')}
                  >
                    <UserCog className='h-4 w-4 mr-2' /> Admin only
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onPermissionChange(file.id, 'instructor')}
                  >
                    <User className='h-4 w-4 mr-2' /> Instructor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onPermissionChange(file.id, 'everyone')}
                  >
                    <Users className='h-4 w-4 mr-2' /> Everyone
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive'>
              <Trash2 className='h-4 w-4 mr-2' /> Delete
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

  // Handle permission change
  const handlePermissionChange = (
    fileId: string,
    permission: 'admin' | 'instructor' | 'everyone'
  ) => {
    setFiles(
      files.map((file) =>
        file.id === fileId ? { ...file, file_permission: permission } : file
      )
    );
  };

  // Handle rename
  const handleRename = (fileId: string, newName: string) => {
    setFiles(
      files.map((file) =>
        file.id === fileId ? { ...file, file_name: newName } : file
      )
    );
  };

  return (
    <Fragment>
      <div className='m-10'>
        <SidebarProvider>
          <AppSidebar />
          <main className='flex w-full flex-col'>
            <div className='flex justify-between items-center'>
              <SidebarTrigger />
              <UserBadge name={name} pic='hahah' role={role} />
            </div>
            <h1 className='text-3xl mt-5 mb-6 font-bold'>Files</h1>

            {/* File List */}
            <div className='w-full bg-background rounded-md shadow'>
              <div>
                {files.map((file) => (
                  <FileItem
                    key={file.id}
                    file={file}
                    onPermissionChange={handlePermissionChange}
                    onRename={handleRename}
                    isRenaming={renamingId === file.id}
                    setRenamingId={setRenamingId}
                  />
                ))}
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
