import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CustomAlert from '../components/CustomAlert';
import port from '../BackendConfig';

const AddLesson = () => {
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  console.log(token);
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formValues, setFormValues] = useState({ title: '', grade_id: '', courseName: '', video_url: '', pdf_url: '', isVisible: true });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (name === 'grade_id') {
      getCourses(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log(token);
    try {
      const response = await fetch(`${port}/admin/addlesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues),
      });
      console.log(response);
      if (response.ok) {
        console.log('Lesson added successfully');
        setAlert({ message: 'تمت إضافة الدرس بنجاح', type: 'success' });
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
      <h1>إضافة درس</h1>
      <form onSubmit={handleSubmit} className="add-admin-form">
        <div className="form-group">
          <label>عنوان الدرس:</label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            required
          />
        </div>
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
            name="courseName"
            value={formValues.courseName}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر الكورس</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>{course.name}</option>
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
        <div className="form-group">
          <label>متاح للطلاب؟</label>
          <select
            name="isVisible"
            value={formValues.isVisible}
            onChange={handleInputChange}
            required
          >
            <option value={true}>متاح</option>
            <option value={false}>غير متاح</option>
          </select>
        </div>
        <button type="submit" className="submit-button">إضافة</button>
      </form>
    </div>
  );
}

export default AddLesson;
