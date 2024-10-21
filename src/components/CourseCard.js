import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({courseId, courseTitle, courseLevel, quizzes, videos, imageUrl, status }) => {
  return (
    <div className="courseCard-container">
      <div className="courseCard-content">
        <img src={imageUrl} alt={courseTitle} className="courseCard-image" />
        <div className="courseCard-details">
          <h3 className="courseCard-title">{courseTitle}</h3>
          <p className="courseCard-level">{courseLevel}</p>
          <p className="courseCard-status">
            <span className={status === 'watched' ? 'courseCard-statusIcon watched' : 'courseCard-statusIcon not-watched'}>
              {status === 'watched' ? 'تم المشاهدة' : 'لم تتم المشاهدة'}
            </span>
          </p>
        </div>
      </div>
      <div className="courseCard-meta">
        <div className="courseCard-stat">
          <span className="courseCard-number">{videos} فيديوهات</span>
        </div>
        <div className="courseCard-stat">
          <span className="courseCard-number">{quizzes} كويزات</span>
        </div>
        <Link className="courseCard-button" to={`/mycourses/${courseId}`}>الذهاب للكورس</Link>
        </div>
    </div>
  );
};

export default CourseCard;
