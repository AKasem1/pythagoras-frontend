import React, { useState, useEffect } from 'react';  
import Cookies from 'js-cookie';
import CustomAlert from '../components/CustomAlert';
import port from '../BackendConfig';

const AddCourses = () => {
    const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
    const [grades, setGrades] = useState([]);
    const [isAddGrade, setIsAddGrade] = useState(true);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [courses, setCourses] = useState([{name: '', imgURL: '', grade: '', price: 0}]);
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
        setIsAddGrade(formType === 'grade');
        setAlert({ message: '', type: '' });
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
    
    return (
        <div className="course-container">
            <div className="button-container">
                <button
                    className={`toggle-button ${isAddGrade ? 'active' : ''}`}
                    onClick={() => handleToggle('grade')}
                >
                    إضافة مرحلة
                </button>
                <div className="divider"></div>
                <button
                    className={`toggle-button ${!isAddGrade ? 'active' : ''}`}
                    onClick={() => handleToggle('course')}
                >
                    إضافة كورسات
                </button>
            </div>
            {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
            <div className="form-container">
                {isAddGrade ? (
                    <form className="form add-grade-form" onSubmit={addGrade}>
                        <h2 className="form-heading">إضافة مرحلة</h2>
                        <label className="form-label">
                            اسم المرحلة:
                            <input type="text" name="gradeName" className="form-input-courses" />
                        </label>
                        <button type="submit" className="submit-button">إضافة</button>
                    </form>
                ) : (
                    
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
            </div>
        </div>
    );
};

export default AddCourses;
