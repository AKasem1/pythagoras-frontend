import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CustomAlert from '../components/CustomAlert';
import port from '../BackendConfig';

const AddAdmin = () => {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const [formValues, setFormValues] = useState({ 
    name: '', email: '', phone: '', 
    password: '', anotherPhone: '', confirmPassword: '', address: '' 
  });
  const [err, setError] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      if (value !== formValues.password) {
        setError(true)
      }
      else {
        setError(false)
        setFormValues({ ...formValues, "password": value });
      }
      }
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminData = { ...formValues };
    console.log(adminData);
    try {
      const response = await fetch(`${port}/admin/addadmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(adminData)
      });
      console.log(response);
      formValues.name = '';
      formValues.email = '';
      formValues.phone = '';
      formValues.password = '';
      formValues.anotherPhone = '';
      formValues.confirmPassword = '';
      formValues.address = '';
      setAlert({ message: 'تمت الإضافة بنجاح', type: 'success' });
    }
    catch (error) {
      setAlert({ message: error.message, type: 'error' });
      console.error(error.message);
    }
  };

  return (
    <div className="add-admin">
      {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <h1>إضافة أدمن</h1>
      <form onSubmit={handleSubmit} className="add-admin-form">
        <div className="form-group">
          <input
            type="text"
            placeholder='الاسم'
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder='البريد الإلكتروني'
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder='رقم الهاتف'
            value={formValues.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="anotherPhone"
            placeholder='رقم هاتف آخر'
            value={formValues.anotherPhone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            placeholder='العنوان'
            value={formValues.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder='كلمة المرور'
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder='تأكيد كلمة المرور'
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            required
            className={err? 'input-error': ''}
          />
          {err && 
            <span className='error'>كلمة المرور غير متطابقة</span>
            }
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">إضافة</button>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
