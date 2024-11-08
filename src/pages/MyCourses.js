import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
  const isAuthenticated = user? true: false;
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const userId = user._id;

  useEffect(() => {
    fetch(`${port}/user/mycourses/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
  })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        console.log(data)
      })
      .catch(err => console.log(err));
  }, [userId])

  return (
    <div>
      <h2 className='font-bold text-3xl mt-4 mb-4'>كورساتي</h2>
      {courses? courses.map((course, index) => (
        <CourseCard
          key={index}
          courseId={course._id}
          courseTitle={course.name}
          quizzes={course.numOfQuizzes}
          videos={course.numOfVideos}
          imageUrl={course.imgURL}
        />
      )): null}
    </div>
  );
};

export default MyCourses;
