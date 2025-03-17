export interface Register {
  student_fname: string;
  student_lname: string;
  email: string;
  password: string;
  otp: string;
}

export interface LoginAcc {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
  otp: string;
  password: string;
  confirmpass: string;
}

export interface VisitorCourse {
  id: string;
  imgSrc: string;
  label: string;
}

export interface CourseCardProps {
  id: string;
  author: string;
  title: string;
  rating: number;
  totalRatings: number;
  lessons: number;
  students: number;
  imgSrc?: string;
}

export interface CourseInfoHeader {
  id: string;
  title: string;
  rating: number;
  totalRatings: number;
  lessons: number;
  students: number;
  instructor: string;
  imgSrc?: string;
  category: string[];
  price: number;
  description: string;
  createdAt: string; // Adding this for sorting functionality
}

export interface CourseInclusion {
  icon: string;
  inclusion: string;
}

export interface CourseInfoProps {
  courseInfoHeader: CourseInfoHeader;
  expOutcomes: string[];
  courseIncludes: CourseInclusion[];
  courseResources: CourseResources[];
}

// export interface CourseProgressChapters {
//   chapterName: string;
//   chapterDuration: string;
// }

// export interface CourseProgressPercent {
//   overalPercentage: number;
// }

// export interface CourseBadges {
//   badgeIcon: string;
// }

// export interface CourseDuration {
//   courseDuration: number;
// }

// export interface CourseLevel {
//   courseLevel: string;
// }

// export interface CourseExercises {
//   courseNoOfExercise: number;
// }

export interface CourseInstructor {
  instructorName: string;
  profileSrc: string;
}

export interface ChapterProgress {
  dateFinished: string | undefined;
  timeFinished: string | undefined;
  isFinished: boolean;
  chapterTitle: string;
  estHoursToFinish: string;
}

export interface OverallProgress {
  overallProgress: number;
  chaptersProgress: ChapterProgress[];
}

export interface CourseInfoCard {
  estimatedHoursToFinish: number;
  level: string;
  noOfLabs: string; //if meron
  achievementBadgesIconSrc: string[];
  instructor: CourseInstructor;
}

export interface CourseResources {
  title: string;
  createdAt: string;
  type: string;
  url: string;
}

export interface CourseTimeline {
  onlineMeetings: string[];
  currentDate?: Date;
}

export interface CourseProgressProps {
  courseInfoHeader: CourseInfoHeader;
  overallProgress: OverallProgress;
  courseInfoCard: CourseInfoCard;
  courseMeetings: CourseTimeline;
  courseResources: CourseResources[];
}

export interface VisitorAnalyticsProps {
  id: string;
  imgSrc: string;
  value: string | number;
  label: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

import { StringToBoolean } from 'class-variance-authority/types';
import type React from 'react';
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType; // Changed to accept React component type
  iconBgColor: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

export interface StatsCard {
  icon: string;
  title: string;
  value: string;
}

export interface EnrolledCourse {
  id: string;
  imgSrc: string;
  author: string;
  title: string;
  finishedPercentage: number;
  finishedOverTotal: string;
}

export interface DashboardStats {
  recentlyEnrolled: EnrolledCourse[];
  chart: ChartDataItem[];
  statscard: StatsCard[];
}

//ung image saka chaptertitle sa top left
export interface CourseLessonHeading {
  imgSrc: string;
  chapterTitle: string;
}

//ung array ng subchapter sa loob ng accordion
export interface CourseSubChapter {
  subchaptertitle: string;
  isFinished: boolean;
}

//ung array ng subchaptertitle tas content sa left
export interface CourseLessonContent {
  subChaptertitle: string;
  subChaptercontent: string;
}

//ung accordion lang mismo kasama ung title sa taas
export interface CourseChaptersAccordion {
  chapterTitle: string;
  subchapters: CourseSubChapter[];
  chapterProgressPercent: number;
}

//course title sa taas at ung accordion
export interface CourseNavigation {
  courseTitle: string;
  courseChapters: CourseChaptersAccordion[];
}

//ung buong content sa left na pinagsama
export interface CourseChapterContent {
  heading: CourseLessonHeading;
  contents: CourseLessonContent[];
}
