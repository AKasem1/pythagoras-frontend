import React from 'react'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import AddAdmin from './AddAdmin';
import AddLesson from './AddLesson';
import StudentsAccounts from './StudentsAccounts';
import AddCourses from './AddCourses';
import {useDispatch} from 'react-redux';
import { logout } from '../features/authSlice';
import AddQuiz from './AddQuiz';
import { MdDashboard } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { MdAddToQueue } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import port from '../BackendConfig';


const Dashboard = () => {
  const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const [numofstudents, setNumOfStudents] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    fetch(`${port}/admin/numofstudents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setNumOfStudents(data.students);
    })
    .catch(err => console.log(err));
  }, [token]);


  const logoutFunction = () => {
    dispatch(logout());
  }

  return (
    <div className="dashboard">
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <aside className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <button onClick={toggleSidebar} className='sidebar-close-button'>X</button>
        <div className="logo">
          <h1>منصة فيثاغورث التعليمية</h1>
        </div>
        <nav className="nav">
          <ul>
            <li className={`flex ${page === 1 ? 'active' : ''}`}><a href="#" onClick={() => setPage(1)}>Dashboard</a>
            <MdDashboard  className='dashboard-icon'/>
            </li>
            <li className={`flex ${page === 2 ? 'active' : ''}`}><a href="#" onClick={() => setPage(2)}>إضافة درس</a>
            <MdAddToQueue className='dashboard-icon'/>
            </li>
            <li className={`flex ${page === 3 ? 'active' : ''}`}><a href="#" onClick={() => setPage(3)}>إضافة كويز</a>
            <MdOutlinePostAdd className='dashboard-icon'/>
            </li>
            <li className={`flex ${page === 4 ? 'active' : ''}`}>
            <a href="#" onClick={() => setPage(4)}>إضافة أدمن</a>
            <TiUserAdd className='dashboard-icon'/>
            </li>
            <li className={`flex ${page === 5 ? 'active' : ''}`}><a href="#" onClick={() => setPage(5)}>حسابات الطلبة</a>
            <GrTransaction className='dashboard-icon'/>
            </li>
            <li className={`flex ${page === 6 ? 'active' : ''}`}><a href="#" onClick={() => setPage(6)}>إضافة مراحل وكورسات</a>
            <MdAddToQueue className='dashboard-icon'/>
            </li>
          </ul>
        </nav>
        <a href="#" className="logout" onClick={logoutFunction}>تسجيل خروج</a>
      </aside>
      <main className={`main-content ${sidebarVisible ? 'shifted' : ''}`}>
      { page === 1 && (  
        <>
        <header className="top-bar">
          <div className="user-info">
            <p></p>
            <span> مرحبًا</span>
          </div>
          <h2>Dashboard</h2>
        </header>
        <section className="cards">
          <div className="card">
            <h3>عدد الطلاب</h3>
            <p>{numofstudents} <span className="change positive">طلاب</span></p>
            <div className="card-graph"></div>
          </div>
          <div className="card">
            <h3>عدد الاشتراكات</h3>
            <p>{0 + " "}<span className="change positive">اشتراك </span></p>
            <div className="card-graph"></div>
          </div>
          <div className="card">
            <h3>صافي الربح</h3>
            <p>0 <span className="change positive">ج</span></p>
            <div className="card-graph"></div>
          </div>
        </section>
        <section className="analytics">
          <div className="real-time-sales">
            <h3>Real-Time Sale</h3>
            <div className="sales-chart">
              
            </div>
          </div>
          <div className="top-products">
            <h3>الأكثر إشتراكًا</h3>
            <ul>
              <li>باب الكيمياء العضوية <span className="progress">20.2%</span></li>
              <li>الباب الثاني في الكيمياء <span className="progress">15.1%</span></li>
              <li>الباب الأول في الكيمياء <span className="progress">10.8%</span></li>
              <li>الكورس التأسيسي في الكيمياء <span className="progress">7.5%</span></li>
            </ul>
          </div>
          <div className="list-merchant">
            <h3>List Merchant</h3>
            <ul>
              <li>GQ Creators <span className="rating">⭐⭐⭐⭐⭐</span></li>
              <li>Dribblers Agency <span className="rating">⭐⭐⭐⭐⭐</span></li>
              <li>Popular_My <span className="rating">⭐⭐⭐⭐⭐</span></li>
            </ul>
          </div>
        </section>
        </>
        )}
        { page === 2 && (
          <AddLesson />
        )}
        { page === 3 && (
          <AddQuiz />
        )}
        { page === 4 && (
          <>
            <AddAdmin />
          </>
        )}
        { page === 5 && (
          <>
            <StudentsAccounts />
          </>
        )}
        { page === 6 && (
          <>
            <AddCourses />
          </>
        )}

      </main>
    </div>
  );
}

export default Dashboard;