import React, { Component, useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll';
import port from '../BackendConfig';
import { Element } from 'react-scroll';
import img from '../teacher.png';
import Cookies from 'js-cookie';
import PricingPackage from '../components/PricingPackage';
import GradeCard from '../components/gradeCard';
import { PiNumberCircleFourFill, PiNumberCircleFiveFill, PiNumberCircleSixFill } from "react-icons/pi";
import Features from '../components/Features';
import {motion} from 'framer-motion';
import { fadeIn } from '../variants';

export const Home = () => {
  const userData = Cookies.get('auth');
  const [show, setShow] = useState(false);
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  // console.log(userData);
  // console.log(JSON.parse(userData).user.role);
 useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1500);
  }, []);
  useEffect(() => {
    fetch(`${port}/user/grades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            setGrades(data);
        })
        .catch(err => console.log(err));
}, []);

const getCourses = async (value) => {
  const grade_id = grades.find(grade => grade.name === value)._id;
  console.log(grades);
  console.log(grade_id);
  try {
    const response = await fetch(`${port}/user/coursesbygrade/${grade_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    setCourses(data);
  }
  catch (error) {
      console.error(error.message);
  }
}

    const cards = [
      {
        title: 'الصف الأول الثانوي',
        subtitle: 'حكومي - لغات',
        description: '06',
        Component: "https://i.ibb.co/G21Fj8x/1sec.jpg",
        color: '#003153'
      },
      {
          title: 'الصف الثاني الثانوي',
          subtitle: 'حكومي - لغات',
          description: '06',
          Component: "https://i.ibb.co/BNmVGGF/2sec.jpg",
          color: '#003153'
        },
        {
          title: 'الصف الثالث الإعدادي',
          subtitle: 'حكومي - لغات',
          description: '05',
          Component: "https://i.ibb.co/Dfsyx1W/3prep.jpg",
          color: '#E97451'
        },
    ];

    const images = [
      "https://media.opensesame.com/images%2Fshutterstock_261177431.jpg?crop=16:9&width=832",
      "https://www.nu.edu.eg/sites/default/files/2022-12/1_jidbi1-elimatb3b2ht5w.png",
      "https://t3.ftcdn.net/jpg/02/11/73/28/360_F_211732841_GknumxwhSdceiB38k7s8fpueXhZQ6RDC.jpg"
    ];

  
  const pricingDetails = [
      "شامل جميع فروع الرياضيات",
      "درسين في الأسبوع",
      "اختبار بعد كل درس",
      "اختبار شهري",
      "تقييم للطالب",
      "متابعة دورية مع ولي الأمر"
    ];

  return (
    <div className="landing-page">
      <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{once: false, amount: 0.7}}
      >
      <Element name="home" className="home-section">
        <div className="home-content">
          <h1 className='font-bold'>منصة فيثاغورث التعليمية</h1>
          {show && <p>عايز ابنك يبقى شاطر في كل الرياضيات؟ منصتنا بتوفر له كل اللي محتاجه من شرح مبسط وتدريبات ممتعة.</p>}          
          <ScrollLink value="الصف الأول الثانوي" onClick={() => getCourses("الصف الأول الثانوي")} to="pricing" smooth={true} duration={500} className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-large font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          الصف الأول الثانوي
          </span>
          </ScrollLink>
          <ScrollLink value="الصف الثاني الثانوي" onClick={() => getCourses("الصف الثاني الثانوي")} to="pricing" smooth={true} duration={500} className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-large font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          الصف الثاني الثانوي
          </span>
          </ScrollLink>
          <ScrollLink value="الصف الثالث الثانوي" onClick={() => getCourses("الصف الثالث الثانوي")} to="pricing" smooth={true} duration={500} className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-large font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          الصف الثالث الثانوي
          </span>
          </ScrollLink>
        </div>
        <div className="home-image">
          <img src={img} alt="Digital Agency" />
        </div>
      </Element>

      </motion.div>
      <div className="separator"></div>
      <motion.div
      variants={fadeIn("left", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{once: false, amount: 0.7}}
      >
      <Element name="grades" className="section">
        <h2 className='font-bold'>المراحل التعليمية</h2>
        <div className="card-container">
      {cards.map((card, index) => (
        <GradeCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          Component={card.Component}
          color={card.color}
        />
      ))}
    </div>
      </Element>
      </motion.div>
      
      <Features />
      
      <Element name="pricing" className="section">
      <br />
        <h2 className='font-bold'>الكورسات</h2>
        <div className="pricing-section">
          {courses.map((course, index) => (
            <PricingPackage
              key={index}
              image={course.imgURL}
              courseId={course._id}
              title={course.name}
              price={course.price + " جنيه"}
              details={pricingDetails}
              user={userData}
            />
          ))}
        </div>
      </Element>
      
    </div>
  )
}
