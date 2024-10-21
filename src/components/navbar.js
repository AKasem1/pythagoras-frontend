import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom'; 
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../logo.png';
import { IoMdWallet } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import {useDispatch} from 'react-redux';
import { logout } from '../features/authSlice';

export const Navbar = () => {
  const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
  const isAuthenticated = user? true: false;
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  const logoutFunction = () => {
    dispatch(logout());
    Cookies.remove('auth');
    navigate('/login'); 
    setDropdownVisible(false);
  }

  return (
    <header className="header">
      <div className="logo">
      {location.pathname != '/Dashboard' &&  location.pathname != '/mycourses/:courseId' && (
        <RouterLink to='/' className="logo-link">
          <img src={logo} alt="منصة زين التعليمية" />
        </RouterLink>
      )}
      </div>
      {location.pathname === '/' && (
        <nav className="nav">
          <ScrollLink to="home" smooth={true} duration={500} className='link'>
            الرئيسية
          </ScrollLink>
          <ScrollLink to="grades" smooth={true} duration={500} className='link'>
            المراحل التعليمية
          </ScrollLink>
          <ScrollLink to="pricing" smooth={true} duration={500} className='link'>
            الأسعار
          </ScrollLink>
          <ScrollLink to="aboutus" smooth={true} duration={500} className='link'>
            من نحن
          </ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='link'>
            تواصل معنا
          </ScrollLink>
          {user && isAuthenticated && user.role === "student" && (
            <RouterLink to='/wallet' className="wallet">
              <IoMdWallet />
            </RouterLink>
          )}
        </nav>
      )}
      {!isAuthenticated && (
        <RouterLink to='/register' className="get-started-btn" style={{textDecoration: "none"}}>
          تسجيل دخول
        </RouterLink>
      )}
      {isAuthenticated && (
        <div className="profile-container"  ref={dropdownRef}>
          <FaUser alt="Profile" className="profile-icon" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="profile-dropdown">
              <p className="welcome-message">أهلاً {user.name}</p>
              {user.role === "admin" && (
                <RouterLink to='/Dashboard' className="dropdown-link" >لوحة التحكم</RouterLink>
              )}
              {user.role === "student" && (
                <RouterLink to='/mycourses' className="dropdown-link" >كورساتي</RouterLink>
              )}
              <RouterLink to='/editprofile' className="dropdown-link">تعديل حسابي</RouterLink>
              <RouterLink to='/register' className="dropdown-link" onClick={logoutFunction}>تسجيل خروج</RouterLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
