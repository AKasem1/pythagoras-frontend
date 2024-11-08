import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CustomAlert from '../components/CustomAlert';
import port from '../BackendConfig';

const AddLesson = () => {
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [formValues, setFormValues] = useState({ grade_id: '', lesson_id: '', video_url: '', pdf_url: ''});
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch(`${port}/admin/grades`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setGrades(data);
      })
      .catch(err => console.log(err));
  }, [token]);

  const getCourses = (gradeId) => {
    fetch(`${port}/admin/coursesbygrade/${gradeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
      })
      .catch(err => console.log(err));
  }

  const getLessons = (courseId) => {
    fetch(`${port}/admin/lessonsbycourse/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setLessons(data);
      })
      .catch(err => console.log(err));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (name === 'grade_id') {
      getCourses(value);
    }
    if (name === 'course_id') {
      getLessons(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log(token);
    try {
      const response = await fetch(`${port}/admin/addvideo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues),
      });
      console.log(response);
      if (response.ok) {
        console.log('Lesson added successfully');
        setAlert({ message: 'تمت إضافة الشرح بنجاح', type: 'success' });
        } else {
        console.log('Failed to add lesson');
        }
    }
    catch (error) {
      console.error(error.message);
      setAlert({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="add-admin">
    {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <h1>إضافة شرح</h1>
      <form onSubmit={handleSubmit} className="add-admin-form">
        <div className="form-group">
          <label>المرحلة:</label>
          <select
            name="grade_id"
            value={formValues.grade_id}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر المرحلة</option>
            {grades.map((grade) => (
              <option key={grade._id} value={grade._id}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>الكورس:</label>
          <select
            name="course_id"
            value={formValues.courseName}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر الكورس</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>الدرس:</label>
          <select
            name="lesson_id"
            value={formValues.courseName}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر الدرس</option>
            {lessons.map((lesson) => (
              <option key={lesson._id} value={lesson._id}>{lesson.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>رابط الفيديو:</label>
          <input
            type="url"
            name="video_url"
            value={formValues.video_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>رابط PDF (اختياري):</label>
          <input
            type="url"
            name="pdf_url"
            value={formValues.pdf_url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-button">إضافة</button>
      </form>
    </div>
  );
}

export default AddLesson;
