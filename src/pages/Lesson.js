import React, { useState } from 'react';

const lessons = [
  {
    "title": "الأفعال المضارعة",
    "grade": "الصف الرابع الابتدائي",
    "module": "اللغة العربية",
    "video_url": "https://www.youtube.com/embed/wCRw3hgIZv4?si=mxStmf-_85E93NCF",
    "pdf_url": "https://drive.google.com/file/d/1bst6EG7HPnUkjWcjJ6LpsD4mePCGUwq9/view?usp=sharing",
    "week_number": 1,
    "month": "فبراير"
  },
  {
    "title": "قراءة قصة قصيرة",
    "grade": "الصف الرابع الابتدائي",
    "module": "اللغة العربية",
    "video_url": "https://www.youtube.com/embed/L-fOHHnVBtY?si=EZ-vL8KojQL_b7Q7",
    "pdf_url": "https://example.com/قصة_قصيرة.pdf",
    "week_number": 2,
    "month": "مارس"
  },
  {
    "title": "الأسماء الموصولة",
    "grade": "الصف الرابع الابتدائي",
    "module": "اللغة العربية",
    "video_url": "https://www.youtube.com/embed/L-fOHHnVBtY?si=EZ-vL8KojQL_b7Q7",
    "pdf_url": "https://drive.google.com/file/d/1bst6EG7HPnUkjWcjJ6LpsD4mePCGUwq9/view?usp=sharing",
    "week_number": 3,
    "month": "يناير"
  },
  {
    "title": "كتابة موضوع تعبير",
    "grade": "الصف الرابع الابتدائي",
    "module": "اللغة العربية",
    "video_url": "https://www.youtube.com/embed/L-fOHHnVBtY?si=EZ-vL8KojQL_b7Q7",
    "pdf_url": "https://drive.google.com/file/d/1bst6EG7HPnUkjWcjJ6LpsD4mePCGUwq9/view?usp=sharing",
    "week_number": 4,
    "month": "أبريل"
  }
];

const Lesson = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Get unique months for the menu
  const months = [...new Set(lessons.map(lesson => lesson.month))];

  // Filter lessons by selected month
  const filteredLessons = lessons.filter(lesson => lesson.month === selectedMonth);

  return (
    <div className="container">
      {/* Right Section */}
      <div className="right-section">
        <h2 className="section-title">الشهور</h2>
        <ul className="menu-list">
          {months.map(month => (
            <li
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`menu-item ${selectedMonth === month ? 'active' : ''}`}
            >
              {month}
            </li>
          ))}
        </ul>
        {filteredLessons.length > 0 && (
          <div className="lessons-list">
            <h2 className="section-title">الدروس</h2>
            <ul className="menu-list">
              {filteredLessons.map(lesson => (
                <li
                  key={lesson.title}
                  onClick={() => setSelectedLesson(lesson)}
                  className="menu-item"
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Left Section */}
      <div className="left-section">
        {selectedLesson ? (
          <div className="lesson-details">
            <h2>{selectedLesson.title}</h2>
            <iframe
              className="video-player"
              src={selectedLesson.video_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            {selectedLesson.pdf_url && (
              <a href={selectedLesson.pdf_url} download>
                <button className="download-button">تحميل الملخص</button>
              </a>
            )}
          </div>
        ) : (
          <p className="placeholder-text">اختر الدرس </p>
        )}
      </div>
    </div>
  );
};

export default Lesson;