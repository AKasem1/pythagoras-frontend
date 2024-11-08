import React, { useState, useEffect } from 'react';  
import Cookies from 'js-cookie';
import CustomAlert from '../components/CustomAlert';
import port from '../BackendConfig';

const AddCourses = () => {
    const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
    const [grades, setGrades] = useState([]);
    const [option, setOption] = useState('grade');
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [courses, setCourses] = useState([{name: '', imgURL: '', grade: '', price: 0}]);
    const [lessons, setLessons] = useState({ title: '', grade_id: '', courseName: '', isVisible: true });
    const [fetchedCourses, setFetchedCourses] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const key = '94a510085448090374c9c304d4af9503';

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

    const handleToggle = (formType) => {
        setOption(formType);
        setAlert({ message: '', type: '' });
    };

    const handleLessonChange = (e) => {
        const { name, value } = e.target;
            setLessons({ ...lessons, [name]: value });
        if (name === 'grade_id') {
          getCourses(value);
        }
      };

    const addGrade = async (e) => {
        e.preventDefault();
        const gradeName = e.target.gradeName.value;
        try {
            const response = await fetch('http://localhost:2025/admin/addgrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: gradeName })
            });
            const data = await response.json();
            if(response.status !== 200) {
                setAlert({ message: data.message, type: 'error' }); 
            } else {
                setAlert({ message: 'تمت إضافة المرحلة بنجاح', type: 'success' });
            }
            console.log(data);
        } catch (error) {
            console.error("error: ", error.message);
        }
    }

    const addLesson = async (e) => {
        e.preventDefault();
        console.log(lessons);
        try {
        const response = await fetch(`${port}/admin/addlesson`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(lessons),
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
    }

    const handleImageChange = async (e) => {
        if (!e.target.files[0]) return;
        
        let image = e.target.files[0];
        setUploading(true);
        console.log('Uploading image...');
    
        const formData = new FormData();
        formData.append('image', image);
        formData.set('key', key)
    
        try {
          const response = await fetch(`https://api.imgbb.com/1/upload?expiration=${key}`, {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          console.log(data.data.url_viewer);
    
          const imageUrl = data.data.url
          setImageUrl(imageUrl);
          
          const updatedCourses = [...courses];
          updatedCourses[courses.length - 1]["imgURL"] = imageUrl;
          setCourses(updatedCourses);
          console.log('Image uploaded successfully:', response.json);
        } catch (error) {
          console.error('Error uploading the image:', error);
        } finally {
          setUploading(false);
        }
      };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name === 'grade') {
            const updatedCourses = [...courses];
            updatedCourses[courses.length - 1].grade = value;
            setCourses(updatedCourses);
        } else {
            const updatedCourses = [...courses];
            updatedCourses[courses.length - 1][name] = value;
            setCourses(updatedCourses);
        }
    }

    const AddCourse = async (e) => {
        e.preventDefault();
        console.log("submitted courses: ", courses);
        try {
            const response = await fetch('http://localhost:2025/admin/addcourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(courses)
            });
            const data = await response.json();
            if(response.status !== 200) {
                setAlert({ message: data.message, type: 'error' }); 
            } else {
                setAlert({ message: 'تمت إضافة الكورسات بنجاح', type: 'success' });
            }
            console.log(data);
        } catch (error) {
            setAlert({ message: 'حدث خطأ ما', type: 'error' });
            console.error("error: ", error.message);
    }
    }

    const handleAddButton = () => {
        console.log("add button clicked");
        setCourses([...courses, {name: '', grades: []}]);
        console.log(courses);
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
            setFetchedCourses(data);
          })
          .catch(err => console.log(err));
      }
    
    return (
        <div className="course-container">
            <div className="button-container">
                <button
                    className={`toggle-button ${option == 'grade' ? 'active' : ''}`}
                    onClick={() => handleToggle('grade')}
                >
                    إضافة مرحلة
                </button>
                <div className="divider"></div>
                <button
                    className={`toggle-button ${option == 'course' ? 'active' : ''}`}
                    onClick={() => handleToggle('course')}
                >
                    إضافة كورسات
                </button>
                <div className="divider"></div>
                <button
                    className={`toggle-button ${option == 'lesson' ? 'active' : ''}`}
                    onClick={() => handleToggle('lesson')}
                >
                    إضافة دروس
                </button>
            </div>
        {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
        <div className="form-container">
            {option === 'grade' && (
            <form className="form add-grade-form" onSubmit={addGrade}>
                <h2 className="form-heading">إضافة مرحلة</h2>
                <label className="form-label">
                    اسم المرحلة:
                    <input type="text" name="gradeName" className="form-input-courses" />
                </label>
                <button type="submit" className="submit-button">إضافة</button>
            </form>
        )}
        {option === 'course' && (
            <form className="add-course-form" onSubmit={AddCourse}>
                <h2 className="form-heading">إضافة كورسات</h2>
                {courses.map((course, index) => (
                    <div key={index}>
                        <label className="form-label">
                            اسم الكورس:
                            <input type="text" name="name" className="form-input" onChange={handleInputChange} required />
                        </label>
                        <label className="form-label">
                            صورة الكورس:
                            <input type="file" onChange={handleImageChange} className='imgUpload'/>
                            {uploading ? 'Uploading...' : ''}
                        </label>
                        <label className="form-label">
                            <select name="grade" onChange={handleInputChange} className="form-select">
                                <option value="">اختر المرحلة</option>
                                {grades.map((grade) => (
                                    <option key={grade._id} value={grade.name}>
                                        {grade.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="form-label">
                            السعر:
                            <input type="number" name="price" className="form-input" onChange={handleInputChange} required />
                        </label>
                    </div>
                ))}
                <div className='buttons'>
                    <button type="button" className="add-button" onClick={handleAddButton}>+</button>
                    <button type="submit" className="submit-lesson-button">إضافة</button>
                </div>
            </form>
        )}
        {option === 'lesson' && (
        <div className="add-admin">
        <form onSubmit={addLesson} className="add-lesson-form">
        <h2 className="form-heading">إضافة دروس</h2>
        <div className="form-group">
          <label className="form-label">عنوان الدرس:</label>
          <input
            type="text"
            name="title"
            value={lessons.title}
            onChange={handleLessonChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">المرحلة:</label>
          <select
            name="grade_id"
            value={lessons.grade_id}
            onChange={handleLessonChange}
            required
            className="form-select"
          >
            <option value="">اختر المرحلة</option>
            {grades.map((grade) => (
              <option key={grade._id} value={grade._id}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">الكورس:</label>
          <select
            name="courseName"
            value={lessons.courseName}
            onChange={handleLessonChange}
            required
            className="form-select"
          >
            <option value="">اختر الكورس</option>
            {fetchedCourses.map((course) => (
              <option key={course._id} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label"> رابط الفيديو (اختياري):</label>
          <input
            type="url"
            name="video_url"
            value={lessons.video_url}
            onChange={handleLessonChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">رابط PDF (اختياري):</label>
          <input
            type="url"
            name="pdf_url"
            value={lessons.pdf_url}
            onChange={handleLessonChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">متاح للطلاب؟</label>
          <select
            name="isVisible"
            value={lessons.isVisible}
            onChange={handleLessonChange}
            required
            className="form-select"
          >
            <option value={true}>متاح</option>
            <option value={false}>غير متاح</option>
          </select>
        </div>
        <button type="submit" className="submit-button">إضافة</button>
        </form>
        </div>
        )}
    </div>
    </div>
    );
};

export default AddCourses;
