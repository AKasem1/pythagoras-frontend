import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setUser, setError } from '../features/authSlice';
import CustomAlert from '../components/CustomAlert';
import port from '../BackendConfig';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const expirationTime = new Date(new Date().getTime() + 3600000);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = (formType) => {
    setIsSignup(formType === 'signup');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      anotherPhone: formData.get('anotherPhone'),
      address: formData.get('address'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    try {
      const response = await fetch(`${port}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (response.ok) {
        console.log(json);
        const userData = { user: json.user, token: json.token };
        dispatch(setUser(userData));
        Cookies.set('auth', JSON.stringify(userData), { expires: expirationTime });
        navigate('/');
      } else {
        setAlert({ message: json.message, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: error.message, type: 'error' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch(`${port}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (response.ok) {
        console.log(json);
        const userData = { user: json.user, token: json.token };
        dispatch(setUser(userData));
        Cookies.set('auth', JSON.stringify(userData), { expires: expirationTime });
        if (userData.role === 'admin') {
          navigate('/dashboard');
          console.log('admin');
        }
        else {
          navigate('/');
          console.log('user');
        }
      } else {
        setAlert({ message: json.message, type: 'error' });
        dispatch(setError(json.message));
      }
    } catch (error) {
      setAlert({ message: error.message, type: 'error' });
      dispatch(setError(error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="button-container">
        <button
          className={`toggle-button ${!isSignup ? 'active' : ''}`}
          onClick={() => handleToggle('login')}
        >
          تسجيل الدخول
        </button>
        <div className="divider"></div>
        <button
          className={`toggle-button ${isSignup ? 'active' : ''}`}
          onClick={() => handleToggle('signup')}
        >
          حساب جديد
        </button>
      </div>
      {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <div className="form-container">
        {isSignup ? (
          <form className="form signup-form" onSubmit={handleSignUp}>
            <h2 className='font-bold'>حساب جديد</h2>
            <label>
              الاسم:
              <input type="text" name="name" required />
            </label>
            <label>
              البريد الإلكتروني:
              <input type="email" name="email" required />
            </label>
            <label>
              رقم الهاتف:
              <input type="tel" name="phone" required />
            </label>
            <label>
              رقم هاتف آخر:
              <input type="tel" name="anotherPhone" required />
            </label>
            <label>
              العنوان:
              <input type="text" name="address" required />
            </label>
            <label>
              كلمة السر:
              <input type="password" name="password" required />
            </label>
            <label>
              تأكيد كلمة السر:
              <input type="password" name="confirmPassword" required />
            </label>
            <button type="submit" className='submitbutton'>إنشاء حساب</button>
          </form>
        ) : (
          <form className="form login-form" onSubmit={handleLogin}>
            <h2 className='font-bold'>تسجيل دخول</h2>
            <label>
              البريد الإلكتروني:
              <input type="email" name="email" required />
            </label>
            <label>
              كلمة السر:
              <input type="password" name="password" required />
            </label>
            <button type="submit" className='submitbutton'>تسجيل دخول</button>
            <br />
            <Link to="/forgetpassword" className='forgetPass'>نسيت كلمة السر؟</Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
