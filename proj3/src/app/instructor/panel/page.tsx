'use client';

import { Fragment, useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/instructor-sidebar';
import { useUserStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import UserBadge from '@/custom/UserBadge';
import CourseCard from '@/custom/CourseCard';
import AddCourseDialog from '@/custom/AddCourseDialog';
import CourseTabs from '@/custom/CourseTabs';

export default function Page() {
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);
  const instructorId = useUserStore((state) => state.roleId);
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const courseId = searchParams.get("id"); // Get course ID from URL
  const [loadingCourses, setLoadingCourses] = useState(true);


  useEffect(() => {
    if (role !== 'instructor' && role !== '') {
      console.log('Redirecting to home page, role = ', role);
      router.push('/');
    }
  }, [role]);

  useEffect(() => {
    if (!courseId && instructorId) {
      fetchCourses();
    }
  }, [instructorId, courseId]);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/init/courses/get',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ created_by_instructor: instructorId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const responseData = await response.json();
      const parsedBody = JSON.parse(responseData.body);
      setCourses(parsedBody.courses || []);
    } catch (error) {

      console.error("Error fetching courses:", error);
    } finally {
      setLoadingCourses(false);

    }
  };

  const fetchCourseDetails = async (courseId: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/init/courses/get',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ course_id: courseId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch course details');
      }

      const responseData = await response.json();
      const parsedBody = JSON.parse(responseData.body);
      console.log("Fetched course:", parsedBody);

      setCourseDetails(parsedBody.course || null);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setError('Failed to load course details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>

      <div className="md:m-10 m-5">

        <SidebarProvider>
          <AppSidebar />
          <main className='flex w-full flex-col'>
            <div className='flex justify-between items-center'>
              <SidebarTrigger />
              <UserBadge name={name} pic='hahah' role={role} />
            </div>

            {/* Show CourseTabs if ID is present, else show courses */}
            {courseId ? (
              loading ? (
                <p>Loading course details...</p>
              ) : error ? (
                <p className='text-red-500'>{error}</p>
              ) : (
                <CourseTabs course={courseDetails} />
              )
            ) : (

              <div id="courses">
                <div className="flex justify-between items-center mt-5">
                  <h1 className="text-3xl">Courses</h1>
                  <AddCourseDialog refreshCourse={fetchCourses} />

                </div>

                {loadingCourses ? (
                  <p>Loading courses...</p>
                ) : (
                  <div className="grid grid-cols-1 gap-5 mt-5">
                    {/* Render Courses Dynamically */}
                    {courses.length > 0 ? (
                      courses.map((course: any) => (
                        <CourseCard
                          key={course.course_id}
                          title={course.course_name}
                          description={course.course_description}
                          id={course.course_id}
                          imageSrc={course.thumbnail}
                        />
                      ))
                    ) : (
                      <p className="mt-4">No courses found.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
