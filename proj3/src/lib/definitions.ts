export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginAcc {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface PasswordReset {
  otp: string;
}

export interface SetNewPassword {
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

export interface VisitorAnalyticsProps {
  id: string;
  imgSrc: string;
  value: string | number;
  label: string;
}
