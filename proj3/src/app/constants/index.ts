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
    author: 'Ivan Gonzales',
    title: 'Introduction to Programming',
    imgSrc: '/course1.jpeg',
    rating: 4.5,
    totalRatings: 312,
    lessons: 12,
    students: 1500,
  },
  {
    id: '2',
    author: 'Ivan Gonzales',
    title: 'Web Development',
    imgSrc: '/course2.jpg',
    rating: 4.7,
    totalRatings: 428,
    lessons: 15,
    students: 2000,
  },
  {
    id: '3',
    author: 'Ivan Gonzales',
    title: 'Data Science Essentials',
    imgSrc: '/course3.jpeg',
    rating: 4.6,
    totalRatings: 256,
    lessons: 10,
    students: 1200,
  },
  {
    id: '4',
    author: 'Ivan Gonzales',
    title: 'Machine Learning Basics',
    imgSrc: '/course4.jpeg',
    rating: 4.8,
    totalRatings: 512,
    lessons: 18,
    students: 2500,
  },
  {
    id: '5',
    author: 'Ivan Gonzales',
    title: 'UX Designing',
    imgSrc: '/course5.jpeg',
    rating: 5.0,
    totalRatings: 234,
    lessons: 25,
    students: 350,
  },
  {
    id: '6',
    author: 'Ivan Gonzales',
    title: 'Prototyping',
    imgSrc: '/course6.png',
    rating: 2.6,
    totalRatings: 678,
    lessons: 5,
    students: 100,
  },
  {
    id: '7',
    author: 'Ivan Gonzales',
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
    author: 'Ivan Gonzales',
    title: 'Introduction to Programming',
    imgSrc: '/course1.jpeg',
    rating: 4.5,
    totalRatings: 312,
    lessons: 12,
    students: 1500,
  },
  {
    id: '2',
    author: 'Ivan Gonzales',
    title: 'Web Development',
    imgSrc: '/course2.jpg',
    rating: 4.7,
    totalRatings: 428,
    lessons: 15,
    students: 2000,
  },
  {
    id: '3',
    author: 'Ivan Gonzales',
    title: 'Data Science Essentials',
    imgSrc: '/course3.jpeg',
    rating: 4.6,
    totalRatings: 256,
    lessons: 10,
    students: 1200,
  },
  {
    id: '4',
    author: 'Ivan Gonzales',
    title: 'Machine Learning Basics',
    imgSrc: '/course4.jpeg',
    rating: 4.8,
    totalRatings: 512,
    lessons: 18,
    students: 2500,
  },
  {
    id: '5',
    author: 'Ivan Gonzales',
    title: 'UX Designing',
    imgSrc: '/course5.jpeg',
    rating: 5.0,
    totalRatings: 234,
    lessons: 25,
    students: 350,
  },
  {
    id: '6',
    author: 'Ivan Gonzales',
    title: 'Prototyping',
    imgSrc: '/course6.png',
    rating: 2.6,
    totalRatings: 678,
    lessons: 5,
    students: 100,
  },
  {
    id: '7',
    author: 'Ivan Gonzales',
    title: 'Cybersecurity',
    imgSrc: '/course7.jpeg',
    rating: 4.1,
    totalRatings: 300,
    lessons: 30,
    students: 3000,
  },
];

export const CourseInfos: CourseInfoProps = {
  courseInfoHeader: {
    id: '1',
    title: 'Introduction to Programming',
    rating: 4.5,
    totalRatings: 312,
    lessons: 12,
    students: 312,
    instructor: 'Hanah Espineda',
    imgSrc: '/course1.jpeg',
    category: ['Tech', 'Contemporary'],
    price: 39.0,
    description:
      "Whether you're a beginner or an experienced developer, explore hands-on tutorials, real-world projects, and expert insights to level up your skills. Start building, debugging, and innovating today!",
    createdAt: '2024-01-15',
  },
  expOutcomes: [
    'Fundamentals of Programming – Understand key concepts like variables, data types, loops, and functions.',
    'Problem-Solving Techniques – Learn how to break down complex problems and write efficient code.',
    'Hands-on Coding – Build real-world projects and practice coding through interactive exercises.',
    'Debugging and Optimization – Identify errors, troubleshoot issues, and improve code performance.',
    'Version Control with Git – Learn the basics of Git and GitHub for collaboration and project management.',
    'Best Practices & Code Efficiency – Write clean, maintainable, and scalable code.',
    'Introduction to Frameworks & Libraries – Explore popular tools to enhance development speed and functionality.',
  ],
  courseResources: [
    { title: 'Keys to Success', createdAt: '2024-03-04', type: 'Video' },
    { title: 'Chapter 1', createdAt: '2024-03-04', type: 'Document' },
    { title: 'Chapter 2', createdAt: '2024-03-04', type: 'Document' },
    { title: 'Chapter 3', createdAt: '2024-03-04', type: 'Document' },
  ],
  courseIncludes: [
    { icon: '/video.png', inclusion: '26.5 hours on-demand video' },
    { icon: '/question.png', inclusion: '1 practice test' },
    { icon: '/assign.png', inclusion: 'Assignments' },
    { icon: '/article.png', inclusion: '1 article' },
    { icon: '/download.png', inclusion: '193 downloadable resources' },
    { icon: '/mobile.png', inclusion: 'Access on mobile and TV' },
    { icon: '/trophy.png', inclusion: 'Certificate of completion' },
  ],
};

export const courseProgressData: CourseProgressProps = {
  courseInfoHeader: {
    id: 'course-001',
    title: 'Advanced Web Development',
    rating: 4.8,
    totalRatings: 1200,
    lessons: 20,
    students: 5000,
    instructor: 'John Doe',
    imgSrc: '/images/web-dev-thumbnail.png',
    category: ['Programming', 'Web Development'],
    price: 49.99,
    description:
      'A deep dive into modern web development practices, covering TypeScript, Next.js, and more.',
    createdAt: '2024-12-01',
  },
  overallProgress: {
    overallProgress: 75,
    chaptersProgress: [
      {
        dateFinished: '2025-02-15',
        timeFinished: '14:30',
        isFinished: true,
        chapterTitle: 'Chapter 1: Introduction to TypeScript',
        estHoursToFinish: '2',
      },
      {
        dateFinished: '2025-02-15',
        timeFinished: '14:30',
        isFinished: true,
        chapterTitle: 'Chapter 2: Introduction to JavaScript',
        estHoursToFinish: '2',
      },
      {
        dateFinished: undefined,
        timeFinished: undefined,
        isFinished: false,
        chapterTitle: 'Chapter 3: Next.js & Server-Side Rendering',
        estHoursToFinish: '3',
      },
    ],
  },
  courseInfoCard: {
    estimatedHoursToFinish: 15,
    level: 'BEGINNER',
    noOfLabs: '5',
    achievementBadgesIconSrc: ['/badge2.png', '/badge1.png', '/badge3.png'],
    instructor: {
      instructorName: 'John Doe',
      profileSrc: '/profile.png',
    },
  },
  courseMeetings: {
    onlineMeetings: [
      '2025-03-06T14:00:00Z',
      '2025-03-09T10:30:00Z',
      '2025-03-10T15:45:00Z',
      '2025-03-12T09:00:00Z',
    ],
    currentDate: new Date(), // Optional, remove if not needed
  },

  courseResources: [
    { title: 'Keys to Success', createdAt: '2024-03-04', type: 'Video' },
    { title: 'Chapter 1', createdAt: '2024-03-04', type: 'Document' },
    { title: 'Chapter 2', createdAt: '2024-03-04', type: 'Document' },
    { title: 'Chapter 3', createdAt: '2024-03-04', type: 'Document' },
  ],
};

export const RecentlyEnrolledCourse: EnrolledCourse[] = [
  {
    id: '1',
    imgSrc: '/course1.jpeg',
    author: 'Ivan Gonzales',
    title: 'Introduction to Programming',
    finishedPercentage: 25,
    finishedOverTotal: '1/10',
  },
  {
    id: '2',
    imgSrc: '/course3.jpeg',
    author: 'Hanah Espineda',
    title: 'Data Science',
    finishedPercentage: 55,
    finishedOverTotal: '1/10',
  },
  {
    id: '3',
    imgSrc: '/course5.jpeg',
    author: 'Danielle Castaneda',
    title: 'UI/UX Design',
    finishedPercentage: 75,
    finishedOverTotal: '1/10',
  },
  {
    id: '4',
    imgSrc: '/course4.jpeg',
    author: 'Therese Gaspar',
    title: 'Software Testing',
    finishedPercentage: 39,
    finishedOverTotal: '1/10',
  },
  {
    id: '5',
    imgSrc: '/course1.jpeg',
    author: 'Zyrille Quilit',
    title: 'Back End Development',
    finishedPercentage: 10,
    finishedOverTotal: '1/10',
  },
  {
    id: '6',
    imgSrc: '/course1.jpeg',
    author: 'Francis Berjuega',
    title: 'Front End Development',
    finishedPercentage: 40,
    finishedOverTotal: '1/10',
  },
  {
    id: '7',
    imgSrc: '/course7.jpeg',
    author: 'Hanah Espineda',
    title: 'Project Management',
    finishedPercentage: 100,
    finishedOverTotal: '1/10',
  },
];

export const DashboardInfos: DashboardStats = {
  recentlyEnrolled: RecentlyEnrolledCourse,
  chart: [
    {
      name: 'Completed',
      value: 80,
      fill: 'bg-primary',
    },
    {
      name: 'Remaining',
      value: 20,
      fill: 'hsl(220, 14%, 96%)',
    },
  ],
  statscard: [
    { icon: '/course.png', title: 'Course Completed', value: '3' },
    { icon: '/lesson.png', title: 'Lessons Viewed', value: '9' },
    { icon: '/cert.png', title: 'Certificates Earned', value: '3' },
  ],
};

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
  CourseChapterContent,
  CourseInfoHeader,
  CourseInfoProps,
  CourseNavigation,
  CourseProgressProps,
  DashboardStats,
  EnrolledCourse,
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

export const courseNavigation: CourseNavigation = {
  courseTitle: 'Introduction to Programming',
  courseChapters: [
    {
      chapterTitle: 'Chapter 1: Getting Started with Web Development',
      subchapters: [
        { subchaptertitle: '1.1 What is HTML?', isFinished: true },
        { subchaptertitle: '1.2 CSS Basics', isFinished: true },
      ],
      chapterProgressPercent: 100,
    },
    {
      chapterTitle: 'Chapter 2: JavaScript Fundamentals',
      subchapters: [
        {
          subchaptertitle: '2.1 Introduction to JavaScript',
          isFinished: false,
        },
        { subchaptertitle: '2.2 Variables and Data Types', isFinished: false },
      ],
      chapterProgressPercent: 0,
    },
  ],
};

export const courseChapterContent: CourseChapterContent = {
  heading: {
    imgSrc: '/course1.jpeg',
    chapterTitle: 'Getting Started with Web Development',
  },
  contents: [
    {
      subChaptertitle: '1.1 What is HTML?',
      subChaptercontent:
        'HTML, or HyperText Markup Language, is the foundation of web development. It is a markup language used to structure content on the web. Unlike programming languages that control logic and calculations, HTML focuses on organizing elements like text, images, links, and multimedia into a structured format that browsers can interpret. Every web page you see online is built with HTML, making it an essential skill for anyone interested in web development. HTML consists of elements enclosed in tags, such as <h1> for headings, <p> for paragraphs, and <img> for images. These elements define the structure and content of a webpage, but they do not control the appearance—this is where CSS comes in. HTML follows a hierarchical structure, meaning elements can be nested within others to create a well-organized webpage layout. Over time, HTML has evolved, with HTML5 introducing new semantic elements like <article>, <section>, and <nav>, improving accessibility and SEO. One of the greatest strengths of HTML is its simplicity. Even beginners can quickly learn the basics and start creating web pages. However, modern web development involves combining HTML with CSS for styling and JavaScript for interactivity. By mastering HTML first, you build a strong foundation for designing functional and visually appealing websites.',
    },
    {
      subChaptertitle: '1.2 CSS Basics',
      subChaptercontent:
        'CSS, or Cascading Style Sheets, is a stylesheet language used to control the appearance of web pages. While HTML structures the content, CSS defines how elements should look, including colors, fonts, spacing, and layout. By separating design from structure, CSS makes websites more visually appealing and easier to maintain. Instead of styling elements directly in HTML, CSS allows developers to create reusable styles, making web design more efficient and scalable. CSS works by selecting HTML elements and applying styles using selectors. For example, a rule like h1 { color: blue; } changes all <h1> headings to blue. Styles can be applied in three ways: inline CSS (directly within an HTML element), internal CSS (inside a <style> tag in the HTML file), or external CSS (linking to a separate .css file). The external method is the most efficient for large projects, as it keeps styling separate from content and allows global updates with ease. Another important concept in CSS is the box model, which defines how elements are spaced and sized using margins, borders, padding, and content. CSS also enables responsive design using media queries, ensuring web pages adapt to different screen sizes. By learning CSS, you gain the ability to create visually stunning and user-friendly websites, setting the stage for more advanced topics like Flexbox, Grid, and animations.',
    },
  ],
};
