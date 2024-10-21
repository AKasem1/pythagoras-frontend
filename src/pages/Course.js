import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import { IoIosReturnLeft } from "react-icons/io";
import port from '../BackendConfig';

function Course() {
    const {courseId} = useParams();
    const [course, setCourse] = useState({});
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedPdf, setSelectedPdf] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
    
    const lessons = [
        { id: 1, isCompleted: true,  title: 'الدرس الأول', videoUrl: 'https://www.youtube.com/embed/Cu3R5it4cQs?si=7DmtHF732cQf7Ibm', pdf_url: 'https://drive.google.com/file/d/1bst6EG7HPnUkjWcjJ6LpsD4mePCGUwq9/view?usp=sharing' },
        { id: 2, isCompleted: false, title: 'الدرس الثاني', videoUrl: 'https://www.youtube.com/embed/hnK-frJO1X8?si=V1tvZblrjpjO0T_L', pdf_url: 'https://drive.google.com/file/d/1bst6EG7HPnUkjWcjJ6LpsD4mePCGUwq9/view?usp=sharing' },
        // Add more lessons here
    ];
    const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;

    const getCourse = (courseId) => {
        fetch(`${port}/user/coursebyid/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(data => {
            setCourse(data);
            console.log(data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
      getCourse(courseId);
      if (lessons.length > 0) {
          setSelectedVideo(lessons[0].videoUrl);
      }
  }, [courseId]);

    const handleLessonClick = (id) => {
        const lesson = lessons.find(lesson => lesson.id === id);
        setSelectedVideo(lesson.videoUrl);
        setSelectedPdf(lesson.pdf_url);
    };
    const handleReturn = () => {
        window.history.back();
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
            {lessons.map((lesson) => (
              <li key={lesson.id} 
              className={`lesson-item 
              ${lesson.videoUrl === selectedVideo ? 'active' : ''} 
              ${lesson.isCompleted ? 'completed' : ''}`}>
                <a href="#" onClick={() => handleLessonClick(lesson.id)}>
                  {lesson.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="logout" onClick={handleReturn}>
          العودة للكورسات
        </Link>
      </aside>
      <IoIosReturnLeft className="return-icon" onClick={handleReturn}/>
      <main className={`main-content ${sidebarVisible ? 'shifted' : ''}`}>
                {selectedVideo ? (
                    <>
                    <div className="action-buttons">
                    <iframe 
                        src={selectedVideo} 
                        className="video-player" 
                        title="Course Video" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    />
                    <Link className="solve-quiz" to={`/quiz/${courseId}`}>حل كويز</Link>
                    <a href={selectedPdf}>
                      <button className="download-file">تحميل الملخص</button>
                    </a>
                    </div>  
                    </>
                ) : (
                    <p>Please select a lesson to view the video.</p>
                )}
                
      </main>
    </div>
  );
};

export default Course