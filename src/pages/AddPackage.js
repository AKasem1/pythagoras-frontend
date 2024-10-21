import React, { useState, useEffect } from 'react';
import CustomAlert from '../components/CustomAlert';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const AddPackage = () => {
    const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
    const [grades, setGrades] = useState([]);
    const [modules, setModules] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [formValues, setFormValues] = useState({
        name: '',
        grade: '',
        modules: [{ module: '', teacher: '', teachers: [] }],
        price: 0,
        teachersPercentage: 0,
        features: []
    });

    useEffect(() => {
        fetch(`${port}/admin/grades`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setGrades(data))
            .catch(err => console.log(err));
    }, [token]);

    const handleGradeChange = (e) => {
        setFormValues({ ...formValues, grade: e.target.value });
        getModules(e.target.value);
    }

    const getModules = async (grade_id) => {
        try {
           await fetch(`${port}/admin/modulesbygrade/${grade_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setModules(data));
        }
        catch(err){
            console.log(err);
        }
    }

    const handleModuleChange = (e, index) => {
        const module_id = e.target.value;
        const updatedModules = [...formValues.modules];
        updatedModules[index].module = module_id;
        setFormValues({ ...formValues, modules: updatedModules });
        getTeachers(module_id, index);
    }

    const getTeachers = async (module_id, index) => {
      try{
        await fetch(`${port}/admin/teachersbymodule/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const updatedModules = [...formValues.modules];
            updatedModules[index].teachers = data; // Store teachers for this module
            setFormValues({ ...formValues, modules: updatedModules });
        });
      }
        catch(err){
            console.log(err);
        }
    }

    const handleTeacherChange = (e, index) => {
        const updatedModules = [...formValues.modules];
        updatedModules[index].teacher = e.target.value;
        setFormValues({ ...formValues, modules: updatedModules });
    }

    const addModule = () => {
        setFormValues({
            ...formValues,
            modules: [...formValues.modules, { module: '', teacher: '', teachers: [] }]
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${port}/admin/addpackage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formValues)
            });
            const data = await response.json();
            if (response.ok) {
                setAlert({ message: 'تمت إضافة العرض بنجاح', type: 'success' });
                setFormValues({
                    name: '',
                    grade: '',
                    modules: [{ module: '', teacher: '', teachers: [] }],
                    price: 0,
                    teachersPercentage: 0,
                    features: []
                });
            } else {
                setAlert({ message: data.message, type: 'error' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="add-package-container">
            <h2 className="form-title">إضافة عرض جديد</h2>
            <form onSubmit={handleSubmit} className="add-package-form">
                <CustomAlert message={alert.message} type={alert.type} />
                <div className="form-group">
                    <label>اسم العرض:</label>
                    <input  
                        type="text"
                        value={formValues.name}
                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>الصف الدراسي:</label>
                    <select
                        value={formValues.grade}
                        onChange={handleGradeChange}
                        required
                        className="form-select"
                    >
                        <option value="">اختر الصف</option>
                        {grades.map((grade) => (
                            <option key={grade._id} value={grade._id}>
                                {grade.name}
                            </option>
                        ))}
                    </select>
                </div>
                {formValues.modules.map((moduleItem, index) => (
                    <div key={index} className="form-group">
                        <label>المادة {index + 1}:</label>
                        <select
                            value={moduleItem.module}
                            onChange={(e) => handleModuleChange(e, index)}
                            required
                            className="form-select"
                        >
                            <option value="">اختر المادة</option>
                            {modules.map((module) => (
                                <option key={module._id} value={module._id}>
                                    {module.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={moduleItem.teacher}
                            onChange={(e) => handleTeacherChange(e, index)}
                            required
                            className="form-select"
                        >
                            <option value="">اختر المدرس</option>
                            {moduleItem.teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="button" onClick={addModule} className="plus-button">
                    + إضافة مادة أخرى
                </button>
                <div className="form-group">
                    <label>السعر:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formValues.price}
                        onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>نسبة المعلمين:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formValues.teachersPercentage}
                        onChange={(e) => setFormValues({ ...formValues, teachersPercentage: e.target.value })}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>الميزات:</label>
                    <textarea
                        value={formValues.features.join(',')}
                        onChange={(e) => setFormValues({ ...formValues, features: e.target.value.split(',') })}
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="submit-Buttonn">إضافة العرض</button>
            </form>
        </div>
    );
}

export default AddPackage;
