// VISITORS NAVIGATION

export const VISITORS_NAVBAR = [
  { href: '/#visitor_courses', key: 'course', label: 'Course' },
  { href: '/#about', key: 'about', label: 'About' },
];

export const VISITORS_ANALYTICS = [
  {
    id: 'students',
    imgSrc: '/book.png',
    value: 'XX+',
    label: 'students engaged',
  },
  {
    id: 'mentors',
    imgSrc: '/mentor.png',
    value: 'XX+',
    label: 'expert mentors',
  },
  {
    id: 'app',
    imgSrc: '/phone.png',
    value: 'XX+',
    label: 'for student mobile app',
  },
];

export const VISITORS_COURSES = [
  { id: 'datasci', imgSrc: '/datasci.png', label: 'Data Science' },
  { id: 'prog', imgSrc: '/prog.png', label: 'Programming & Development' },
  { id: 'ai', imgSrc: '/ai.png', label: 'Artificial Intelligence' },
  { id: 'business', imgSrc: '/business.png', label: 'Business' },
  { id: 'prod', imgSrc: '/prod.png', label: 'Product Management' },
  { id: 'cloud', imgSrc: '/cloud.png', label: 'Cloud Computing' },
];

export const POPULAR_COURSES = [
  {
    id: '1',
    title: 'Introduction to Programming',
    imgSrc: '/course1.jpeg',
    rating: 4.5,
    totalRatings: 312,
    lessons: 12,
    students: 1500,
  },
  {
    id: '2',
    title: 'Web Development',
    imgSrc: '/course2.jpg',
    rating: 4.7,
    totalRatings: 428,
    lessons: 15,
    students: 2000,
  },
  {
    id: '3',
    title: 'Data Science Essentials',
    imgSrc: '/course3.jpeg',
    rating: 4.6,
    totalRatings: 256,
    lessons: 10,
    students: 1200,
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    imgSrc: '/course4.jpeg',
    rating: 4.8,
    totalRatings: 512,
    lessons: 18,
    students: 2500,
  },
  {
    id: '5',
    title: 'UX Designing',
    imgSrc: '/course5.jpeg',
    rating: 5.0,
    totalRatings: 234,
    lessons: 25,
    students: 350,
  },
  {
    id: '6',
    title: 'Prototyping',
    imgSrc: '/course6.png',
    rating: 2.6,
    totalRatings: 678,
    lessons: 5,
    students: 100,
  },
  {
    id: '7',
    title: 'Cybersecurity',
    imgSrc: '/course7.jpeg',
    rating: 4.1,
    totalRatings: 300,
    lessons: 30,
    students: 3000,
  },
];

export const ALL_COURSES = [
  {
    id: '1',
    title: 'Introduction to Programming',
    imgSrc: '/course1.jpeg',
    rating: 4.5,
    totalRatings: 312,
    lessons: 12,
    students: 1500,
  },
  {
    id: '2',
    title: 'Web Development',
    imgSrc: '/course2.jpg',
    rating: 4.7,
    totalRatings: 428,
    lessons: 15,
    students: 2000,
  },
  {
    id: '3',
    title: 'Data Science Essentials',
    imgSrc: '/course3.jpeg',
    rating: 4.6,
    totalRatings: 256,
    lessons: 10,
    students: 1200,
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    imgSrc: '/course4.jpeg',
    rating: 4.8,
    totalRatings: 512,
    lessons: 18,
    students: 2500,
  },
  {
    id: '5',
    title: 'UX Designing',
    imgSrc: '/course5.jpeg',
    rating: 5.0,
    totalRatings: 234,
    lessons: 25,
    students: 350,
  },
  {
    id: '6',
    title: 'Prototyping',
    imgSrc: '/course6.png',
    rating: 2.6,
    totalRatings: 678,
    lessons: 5,
    students: 100,
  },
  {
    id: '7',
    title: 'Cybersecurity',
    imgSrc: '/course7.jpeg',
    rating: 4.1,
    totalRatings: 300,
    lessons: 30,
    students: 3000,
  },
];

export const CourseInfos: CourseInfoProps[] = [
  {
    id: '1',
    title: 'Introduction to Programming',
    rating: 4.5,
    totalRatings: 312,
    lessons: 12,
    students: 312,
    imgSrc: '/course1.jpeg',
    category: ['Tech', 'Contemporary'],
    price: 39.0,
    description:
      "Whether you're a beginner or an experienced developer, explore hands-on tutorials, real-world projects, and expert insights to level up your skills. Start building, debugging, and innovating today!",
    createdAt: '2024-01-15',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Student',
    quote:
      "John has been sharing his passion for data for over a decade. He's used data science for work ranging from cancer research to process automation. He recently has found a passion for solving data science problems within marketplace companies.",
    image: '/profile.png',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    role: 'Data Scientist',
    quote:
      "Sarah brings over 15 years of experience in machine learning and AI. Her work has revolutionized how we approach predictive analytics in healthcare. She's passionate about mentoring the next generation of data scientists.",
    image: '/profile.png',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'AI Researcher',
    quote:
      "Michael's innovative approach to deep learning has earned him recognition worldwide. He specializes in computer vision and has contributed to breakthrough projects in autonomous systems. His teaching style makes complex concepts accessible.",
    image: '/profile.png',
  },
] as const;

import type {
  CourseInfoProps,
  Feature,
  FooterColumn,
  SocialLink,
} from '@/lib/definitions';
import {
  BsChatSquareText,
  BsBook,
  BsAward,
  BsTag,
  BsLightbulb,
} from 'react-icons/bs';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

export const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Best Tutors',
    description:
      'Learn from industry experts and entrepreneurs who share real-world insights, mentorship, and strategies to help you succeed.',
    icon: BsChatSquareText,
    iconBgColor: 'bg-primary',
  },
  {
    id: 2,
    title: 'Best curriculum',
    description:
      'Our courses cover essential business skills, from startup basics to advanced strategies, ensuring you stay ahead in the game.',
    icon: BsBook,
    iconBgColor: 'bg-primary',
  },
  {
    id: 3,
    title: 'Certificate',
    description:
      'Earn industry-recognized certificates to showcase your skills and achievements, helping you gain credibility and opportunities.',
    icon: BsAward,
    iconBgColor: 'bg-primary',
  },
  {
    id: 4,
    title: 'Best Price',
    description:
      'Affordable and flexible pricing plans ensure everyone can access high-quality business education. Start now and upgrade as you grow.',
    icon: BsTag,
    iconBgColor: 'bg-primary',
  },
  {
    id: 5,
    title: 'Creative Thinking',
    description:
      'Develop innovative problem-solving skills and strategies to build, adapt, and thrive in a competitive business landscape.',
    icon: BsLightbulb,
    iconBgColor: 'bg-primary',
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Course', href: '#visitor_courses' },
      { label: 'About Us', href: '#about' },
      { label: 'Pricing', href: '/' },
    ],
  },
  {
    title: 'Featured Programs',
    links: [
      { label: 'Business Analytics', href: '/' },
      { label: 'Data Analyst', href: '/' },
      { label: 'Digital Marketing', href: '/' },
      { label: 'Intro to Programming', href: '/' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: FaFacebookF,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: FaLinkedinIn,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: FaInstagram,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: FaTwitter,
  },
];
