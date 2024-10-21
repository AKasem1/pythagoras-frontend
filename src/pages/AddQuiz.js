import React, { useState, useEffect } from 'react';
import CustomAlert from '../components/CustomAlert';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const AddQuiz = () => {
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState([{ sort: 1, question: '', answers: ['', '', '', ''], correctAnswer: '', imgURL: '' }]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [full_mark ,setFullMark] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const key = '94a510085448090374c9c304d4af9503';


  useEffect(() => {
    fetch(`${port}/admin/grades`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setGrades(data))
      .catch(err => console.log(err));
  }, [token]);

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    getCourses(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    getLessons(e.target.value);
  };

  const handleImageChange = async (value, field, index) => {
    console.log('Image:', value);
    if (!value) return;
    
    let image = value;
    setUploading(true);
    console.log('Uploading image...');

    const formData = new FormData();
    formData.append('image', image);
    formData.set('key', key)

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=${key}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data.data.url_viewer);

      const imageUrl = data.data.url
      setImageUrl(imageUrl);

      const newQuestions = [...questions];
      newQuestions[index][field] = imageUrl;
      setQuestions(newQuestions);

      console.log('Image uploaded successfully:', response.json);
    } catch (error) {
      console.error('Error uploading the image:', error);
    } finally {
      setUploading(false);
    }
  };


  const getCourses = async (grade_id) => {
    try {
      const response = await fetch(`${port}/admin/coursesbygrade/${grade_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getLessons = async (course_id) => {
    try {
      const response = await fetch(`${port}/admin/lesson/${course_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("lesson: ",  data);
      setLessons(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { sort: questions.length + 1, question: '', answers: ['', '', '', ''], correctAnswer: '', imgURL: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = { lesson_id: selectedLesson, course_id: selectedCourse, full_mark, questions };
    console.log('submitted questions:', questions);
    console.log('Form values:', formValues);
    try {
      const response = await fetch(`${port}/admin/addquiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
      })
      const data = await response.json();
      if(response.ok){
        setAlert({ message: 'تمت إضافة الكويز بنجاح', type: 'success' });
        setQuestions([{ sort: 1, question: '', answers: ['', '', '', ''], correctAnswer: '', imgURL: '' }]);
        setSelectedGrade('');
        setSelectedCourse('');
        setImageUrl('');
        setSelectedLesson('');
        setFullMark(0);
      }
      else{
        setAlert({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: error.message, type: 'error' });
      console.log(error);
    }
  };

  return (
    <form className="add-quiz-form" onSubmit={handleSubmit}>
    {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <div className="add-quiz-form__field">
        <label htmlFor="grade" className="add-quiz-form__label">المرحلة الدراسية</label>
        <select id="grade" value={selectedGrade} onChange={handleGradeChange} className="add-quiz-form__select">
          <option value="">اختر المرحلة الدراسية</option>
          {grades.map((grade) => (
            <option key={grade._id} value={grade._id}>{grade.name}</option>
          ))}
        </select>
      </div>

      <div className="add-quiz-form__field">
        <label htmlFor="course" className="add-quiz-form__label">اختر المادة</label>
        <select id="course" value={selectedCourse} onChange={handleCourseChange} className="add-quiz-form__select">
          <option value="">اختر الكورس</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>
      </div>

      <div className="add-quiz-form__field">
        <label htmlFor="lesson" className="add-quiz-form__label">الدرس</label>
        <select id="lesson" value={selectedLesson} onChange={(e) => setSelectedLesson(e.target.value)} className="add-quiz-form__select">
          <option value="">اختر الدرس</option>
          {lessons.map((lesson) => (
            <option key={lesson._id} value={lesson._id}>{lesson.title}</option>
          ))}
        </select>
      </div>
      <div className="add-quiz-form__field">
        <label htmlFor="fullmark" className="add-quiz-form__label">الدرجة الكلية</label>
        <input
            type="number"
            value={full_mark}
            onChange={(e) => setFullMark(e.target.value)}
            className="add-quiz-form__input"
          />
      </div>

      {questions.map((question, index) => (
        <div key={index} className="add-quiz-form__question">
          <label className="add-quiz-form__label">سؤال {question.sort}</label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            className="add-quiz-form__input"
          />
          <h1 />
          <label className="add-quiz-form__label">الاختيارات</label>
          {question.answers.map((answer, answerIndex) => (
            <input
              key={answerIndex}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
              className="add-quiz-form__input"
            />
          ))}
          <h1 />
          <label className="add-quiz-form__label">الإجابة الصحيحة</label>
          <input
            type="text"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            className="add-quiz-form__input"
          />
          <h1 />
          <label className="add-quiz-form__label">صورة توضيحية (إن وجدت)</label>
          <input type="file" onChange={(e) => handleImageChange(e.target.files[0], "imgURL", index)} className='imgUpload'/>
          {uploading ? 'Uploading...' : ''}
        </div>
      ))}

      <button type="button" onClick={addQuestion} className="add-quiz-form__add-question-button">+ إضافة سؤال آخر</button>
      <button type="submit" className="add-quiz-form__submit-button">حفظ الكويز</button>
    </form>
  );
};

export default AddQuiz;
