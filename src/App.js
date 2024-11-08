import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Cookies from 'js-cookie';
import Footer from './components/Footer';
import { Navbar } from './components/navbar';
import { Home } from './pages/Home';
import Login from './pages/login';
import ForgetPassword from './pages/ForgetPassword';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import ImageUpload from './pages/ImageUpload';
import { useSelector } from 'react-redux';
import Payment from './pages/Payment';
import TimerComponent from './components/TimerComponent';
import Loader from './components/Loader';
import InvoiceTable from "./pages/InvoiceTable";
import ScrollProgressBar from "./components/ScrollProgressBar";
import EditProfile from "./pages/EditProfile";
import { Quiz } from "./pages/Quiz";
import MyCourses from "./pages/MyCourses";
import Course from "./pages/Course";

const App = () => {
    const [loading, setLoading] = useState(true);
    // const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = user? true: false;
    // const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
    // console.log(isAuthenticated, token);
    // console.log(user);
  const token = useSelector((state) => state.auth.token);
  console.log("logging store data: ", useSelector((state) => state.auth.user))
  // console.log(user, isAuthenticated, token);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="App">
      <Navbar />
      <ScrollProgressBar />
      {loading? (<Loader />) : (
      <div className="pages">
          <Routes>
            <Route 
              exact path="/"
              element={<Home />} 
            />
            <Route 
              exact path="/register"
              element={<Login />}
            />
            <Route 
              exact path="/forgetpassword"
              element={<ForgetPassword />}
            />
            <Route 
              exact path="/imageupload"
              element={<ImageUpload />}
            />
            <Route path="/wallet" element={<Navigate to="/register" />} />
            <Route path="/timer" element={<TimerComponent />} />
            <Route path="/payment" element={user && isAuthenticated? <Payment /> : <Navigate to="/register" />} />
            <Route path="/dashboard" element={user && user.role == 'admin' ? <Dashboard /> : <Navigate to="/register" />} />
            <Route path="/lesson" element={user && isAuthenticated ? <Lesson /> : <Navigate to="/register" />} />
            <Route path="/invoice/:courseId" element={user && isAuthenticated ? <InvoiceTable /> : <Navigate to="/register" />} />
            <Route path="/editprofile" element={user && isAuthenticated ? <EditProfile /> : <Navigate to="/register" />} />
            <Route path="/quiz/:quizId" element={user && isAuthenticated ? <Quiz /> : <Navigate to="/register" />} />
            <Route path="/mycourses" element={user && isAuthenticated ? <MyCourses /> : <Navigate to="/register" />} />
            <Route path="/mycourses/:courseId" element={user && isAuthenticated ? <Course /> : <Navigate to="/register" />} />

        </Routes>
      <Footer name="footer" />
      </div>
    )}
    </div>
  );
};

export default App;
