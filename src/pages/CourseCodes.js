import React, { useEffect, useState } from 'react';
import { RiFileExcel2Line } from "react-icons/ri";
import CustomAlert from '../components/CustomAlert';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const CourseCodes = () => {
  const [codes, setCodes] = useState([]);
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formValues, setFormValues] = useState({ grade_id: '', course_id: '', status: ''});
  const [searchValues, setSearchValues] = useState({ gradeId: '', courseId: '', codeStatus: ''});
  const [alert, setAlert] = useState({ message: '', type: '' });
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const [selectedGradeName, setSelectedGradeName] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
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
        setGrades(data);
      })
      .catch(err => console.log(err));
  }, [token]);


  const handleGenerateCodes = (e) => {
    e.preventDefault();
    const response = 0;
    if (response.ok) {
        console.log('Lesson added successfully');
        setAlert({ message: 'تم توليد الأكواد بنجاح', type: 'success' });
        } else {
            setAlert({ message: 'حدث خطأ أثناء توليد الأكواد', type: 'error' });
        }
    
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchValues)
    try {
      const response = await fetch(`${port}/admin/getcodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(searchValues),
      });
      const data = await response.json();
      console.log(data)
      setCodes(data)
      console.log(selectedCourseName)
      console.log(selectedGradeName)
    }
    catch (error) {
      console.error(error.message);
      setAlert({ message: error.message, type: 'error' });
    }
  }

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
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
    if (name === 'gradeId') {
      getCourses(value);
      const gradeName = grades.find((grade) => grade._id == value)?.name;
      setSelectedGradeName(gradeName || '');
    }
    if (name === 'courseId') {
        const courseName = courses.find((course) => course._id == value)?.name;
        setSelectedCourseName(courseName || '');
      }
  };

  const handleExcel = async (e) => {
    e.preventDefault();
    console.log(searchValues)
    const excelBody = {...searchValues, selectedGradeName}
    try {
      const response = await fetch(`${port}/admin/excelCodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(excelBody),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'codes.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

    }
    catch (error) {
      console.error(error.message);
      setAlert({ message: error.message, type: 'error' });
    }
  }

  return (
    <div className="code-management-container">
        {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <div className="generate-section">
        <form onSubmit={handleGenerateCodes}>
          <div className="generate-form-group">
            <label htmlFor="grade">المرحلة الدراسية</label>
            <select 
            className="dropdown"
            name="grade_id"
            value={formValues.grade_id}
            onChange={handleInputChange}
            required
            >
              <option value="">اختر المرحلة الدراسية</option>
              {grades.map((grade) => (
                <option value={grade._id}>{grade.name}</option>
              ))}
            </select>
          </div>
          <div className="generate-form-group">
            <label htmlFor="course">الكورس</label>
            <select
            className="dropdown"
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
          <div className="generate-form-group">
            <label htmlFor="numberOfCodes">عدد الأكواد</label>
            <input 
            type="number" 
            name="status"
            value={formValues.status}
            onChange={handleInputChange}
            required
            className="input-field" />
          </div>
          <button type="submit" className="generate-button">توليد الأكواد</button>
        </form>
      </div>

      <div className="table-section">
        <div className="filters">
            <select 
            className="dropdown"
            name="gradeId"
            value={searchValues.gradeId}
            onChange={handleFilterChange}
            required
            >
              <option value="">اختر المرحلة الدراسية</option>
              {grades.map((grade) => (
                <option value={grade._id}>{grade.name}</option>
              ))}
            </select>
            <select
            className="dropdown"
            name="courseId"
            value={searchValues.courseId}
            onChange={handleFilterChange}
            required
          >
            <option value="">اختر الكورس</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
            </select>
            <select
            className="dropdown"
            name="codeStatus"
            value={searchValues.codeStatus}
            onChange={handleFilterChange}
            required>
                <option value="">حالة الكود</option>
                <option value="متاح">متاح</option>
                <option value="تم البيع">تم البيع</option>
                <option value="تم الاستخدام">تم الاستخدام</option>
          </select>
          <button className="search-button" onClick={handleSearch}>بحث</button>
          <button className="excel-download-button" onClick={handleExcel}>
            <RiFileExcel2Line className='excel-icon'/>
          </button>
        </div>
        <table className="code-table">
          <thead>
            <tr>
              <th>م</th>
              <th>الكود</th>
              <th>الكورس</th>
              <th>المرحلة الدراسية</th>
              <th>حالة الكود</th>
            </tr>
          </thead>
          <tbody>
            {codes? codes.map((code, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{code.code}</td>
                <td>{selectedCourseName}</td>
                <td>{selectedGradeName}</td>
                <td>{code.status}</td>
              </tr>
            )): (
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseCodes;
