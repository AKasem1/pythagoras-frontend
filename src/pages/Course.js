import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import { IoIosReturnLeft } from "react-icons/io";
import port from '../BackendConfig';
import ReactPlayer from 'react-player'

function Course() {
    const {courseId} = useParams();
    const playerRef = useRef(null);
    const [course, setCourse] = useState({});
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedPdf, setSelectedPdf] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
    
    const [lessons, setLessons] = useState([
        { id: 0, title: '', video_url: '', pdf_url: '' },
      ]);

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

    const getLessons = (courseId) => {
        fetch(`${port}/user/lessonsbycourse/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(data => {
          console.log(data)
            setLessons(data)
        })
        .catch(err => console.log(err));
    }

  useEffect(() => {
      getCourse(courseId);
      getLessons(courseId);
      if (lessons.length > 0) {
          setSelectedVideo(lessons[0].videoUrl);
      }
  }, [courseId]);



  const handleLessonClick = (id) => {
      const lesson = lessons.find(lesson => lesson.id === id);
      setSelectedVideo(lesson.video_url);
      setSelectedPdf(lesson.pdf_url);
  };

  const handleReturn = () => {
      window.history.back();
  };


  const myCallback = () => {
    alert("video ended..")
    console.log("video ended..")
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
                    <div id="videoPlayerContainer">
                    {/* <ReactPlayer playing muted onEnded={myCallback}  width="450px" height="100%" url={selectedVideo} className='video-player' /> */}
                     <iframe
                                    id="videoPlayer"
                                    src={`${selectedVideo}`}
                                    className="video-player"
                                    title="Course Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onEnded={myCallback}
                                />
                    </div>
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