import React, { useState } from 'react';
import CustomAlert from '../components/CustomAlert'; // Import the CustomAlert component
import { Navigate } from 'react-router-dom';
import port from '../BackendConfig';

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // Track the current step in the flow
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' }); // State to manage alert
  const [redirectToLogin, setRedirectToLogin] = useState(false); // State to handle redirection

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${port}/user/forgetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.message;
      }
      setStep(2);
      setAlert({ message: 'تم إرسال رمز التحقق لبريدك الإلكتروني', type: 'success' });
    } catch (error) {
      console.log(error);
      setAlert({ message: error, type: 'error' });
      return;
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${port}/user/otpverification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ OTP: otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.message;
      }
      setAlert({ message: 'تم التحقق بنجاح', type: 'success' });
      setStep(3);
    } catch (error) {
      console.log(error);
      setAlert({ message: error, type: 'error' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({ message: 'كلمة السر غير متطابقة', type: 'error' });
      return;
    }
    try {
      const response = await fetch(`${port}/user/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword, passwordAgain: confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.message;
      }
      setAlert({ message: 'تم تغيير كلمة السر بنجاح', type: 'success' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setRedirectToLogin(true);
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlert({ message: error, type: 'error' });
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="forget-password-container">
      {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="form email-form">
          <h2>إعادة تعيين كلمة السر</h2>
          <label>
            البريد الإلكتروني:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submitbutton">إرسال رمز التحقق</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="form otp-form">
          <h2>تم إرسال رمز التحقق لبريدك الإلكتروني</h2>
          <label>
            رمز التحقق:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submitbutton">تأكد من رمز التحقق</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handlePasswordSubmit} className="form password-form">
          <h2>تعيين كلمة سر جديدة</h2>
          <label>
            كلمة السر الجديدة:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label>
            تأكيد كلمة السر:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submitbutton">إعادة تعيين كلمة السر</button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
