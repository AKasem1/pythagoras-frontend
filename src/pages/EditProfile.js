import React, { useState } from 'react';
import Cookies from 'js-cookie';
import CustomAlert from '../components/CustomAlert';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import port from '../BackendConfig';

const EditProfile = () => {
    const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
    console.log(user);
    const isAuthenticated = user? true: false;
    const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;  
    const expirationTime = new Date(new Date().getTime() + 3600000);

    const [alert, setAlert] = useState({ message: '', type: '' });
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        anotherPhone: user.anotherPhone,
        address: user.address
    });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
        const response = await fetch(`${port}/user/editprofile/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data.user);
            dispatch(setUser(data.user));
            Cookies.remove('auth');
            Cookies.set('auth', JSON.stringify({ user: data.user, token: token }), { expires: expirationTime });
            setAlert({ message: 'تم تعديل البريد الإلكتروني بنجاح', type: 'success' });
        }
        else {
            setAlert({ message: data.message, type: 'error' });
          }
        
    } catch (error) {
        setAlert({ message: error.message, type: 'error' });
        console.log(error);
    }
  };

  return (
    <div className="edit-profile-container">
    {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">الاسم</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={formData.name} 
              onChange={handleInputChange}  />
          </div>
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email} 
              onChange={handleInputChange}  />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">رقم التليفون</label>
            <input 
              type="number" 
              name="phone" 
              id="phone" 
              value={formData.phone} 
              onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="anotherPhone">رقم تليفون آخر</label>
            <input 
              type="number" 
              name="anotherPhone" 
              id="anotherPhone" 
              value={formData.anotherPhone} 
              onChange={handleInputChange}  />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">العنوان</label>
            <input 
              type="text" 
              name="address" 
              id="address" 
              value={formData.address} 
              onChange={handleInputChange}  />
          </div>
        </div>

        <button type="submit" className="save-button">حفظ</button>
      </form>
    </div>
  );
};

export default EditProfile;
