export interface Register {
  first_name: string;
  last_name: string;
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
  imgSrc?: string;
  category: string[];
  price: number;
  description: string;
  createdAt: string; // Adding this for sorting functionality
}

export interface CourseResources {
  title: string;
  createdAt: string;
  type: string;
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
