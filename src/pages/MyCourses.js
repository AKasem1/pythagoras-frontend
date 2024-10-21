import React from 'react';
import CourseCard from '../components/CourseCard';
const MyCourses = () => {
  const courses = [
    {
        courseId: '66fca8bdc6fef8711d031b30',
        courseTitle: 'الكيمياء العضوية',
        courseLevel: 'الصف الأول الثانوي',
        quizzes: 5,
        videos: 5,
        imageUrl: 'https://i.ibb.co/qgH7Bxq/chemisty-lessons.jpg',
        status: 'watched',
    },
    {
        courseId: '266ff23ecc3986829b55512a4',
        courseTitle: 'الكيمياء العضوية',
        courseLevel: 'الصف الأول الثانوي',
        quizzes: 5,
        videos: 5,
        imageUrl: 'https://i.ibb.co/x6rgLWs/science.png',
        status: 'not-watched',
    },
    // Add more courses here
  ];

  return (
    <div>
      <h2 className='font-bold text-3xl mt-4 mb-4'>كورساتي</h2>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          courseId={course.courseId}
          courseTitle={course.courseTitle}
          courseLevel={course.courseLevel}
          quizzes={course.quizzes}
          videos={course.videos}
          imageUrl={course.imageUrl}
          status={course.status}
        />
      ))}
    </div>
  );
};

export default MyCourses;
