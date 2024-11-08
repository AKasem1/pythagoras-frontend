import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import port from '../BackendConfig';
import CustomAlert from '../components/CustomAlert';

const InvoiceTable = () => {
  const { courseId } = useParams();
  console.log("courseId:", courseId);
  const [lessons, setLessons] = useState([])
  const [grade, setGrade] = useState("")
  const [price, setPrice] = useState()
  const [alert, setAlert] = useState({ message: '', type: '' });
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
  const name = user? user.name: 'Guest';

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`${port}/user/lessonsbycourse/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("lessons:", data)
      setLessons(data);
      setPrice(data[0].course.price)
      setGrade(data[0].grade.name)
    };
    fetchCourse();
  }, [courseId]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100000);
  };

  const serialNumber = generateRandomNumber();

  const enrollCourse = async () => {
    const response = await fetch(`${port}/user/subscribe/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({user_id: user._id, price}),
    });
    console.log(response);
      if (response.ok) {
        console.log('Course Enrolled successfully');
        setAlert({ message: 'تم الاشتراك في الكورس بنجاح', type: 'success' });
        } else {
        console.log('Failed to add lesson');
        }
  };

  return (
    <>
    <div className="invoice-table-container">
    {alert.message && <CustomAlert message={alert.message} type={alert.type} />}
      <h2 className="heading">فاتورة الكورس</h2>
      <p className="sub-heading">{name}</p>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>السيرال</th>
            <th>المرحلة</th>
            <th>تاريخ الفاتورة</th>
            <th>سعر الفاتورة</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{serialNumber}</td>
            <td>{grade}</td>
            <td>{new Date().toLocaleDateString()}</td>
            <td>{price}</td>
            <td>
              <button className="pay-button" onClick={enrollCourse}>اشتراك</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <div className="course-content">
        <h2 className="content-heading">محتوى الكورس</h2>
        {lessons? lessons.map((lesson) => (
          <div className="course-item">
          <div className="course-title">
            <span>{lesson.title}</span>
            <span className="icon">🔗</span>
          </div>
        </div>
        )): null}
      </div>
      </>
  );
};

export default InvoiceTable;
