import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const InvoiceTable = () => {
  const { courseId } = useParams();
  console.log("courseId:", courseId);
  const [course, setCourse] = useState({ name: '', grade: { name: '' }, price: 0 });
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const user = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).user: null;
  const name = user? user.name: 'Guest';
  console.log("name:", name);

  useEffect(() => {
    console.log("Hi");
    const fetchCourse = async () => {
      const response = await fetch(`${port}/user/coursebyid/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCourse(data);
    };
    fetchCourse();
  }, [courseId]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100000);
  };

  const serialNumber = generateRandomNumber();

  return (
    <>
    <div className="invoice-table-container">
      <h2 className="heading">فاتورة الكورس</h2>
      <p className="sub-heading">{name}</p>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>السيرال</th>
            <th>المرحلة</th>
            <th>تاريخ الفاتورة</th>
            <th>سعر الفاتورة</th>
            <th>سعر الكورس</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{serialNumber}</td>
            <td>{course.grade.name}</td>
            <td>{new Date().toLocaleDateString()}</td>
            <td>{course.price}</td>
            <td>
              <button className="pay-button">دفع الفاتورة</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <div className="course-content">
        <h2 className="content-heading">محتوى الكورس</h2>
        <div className="course-item">
          <div className="course-title">
            <span>الأسبوع الأول - الفصل الأول</span>
            <span className="icon">🔗</span>
          </div>
          <p className="course-description">التاريخ الإسلامي - الطريق المجد...</p>
        </div>
        <div className="course-item">
          <div className="course-title">
            <span>الأسبوع الثاني - الفصل الأول</span>
            <span className="icon">🔗</span>
          </div>
          <p className="course-description">التاريخ الإسلامي - الفصل الثاني...</p>
        </div>
        <div className="course-item">
          <div className="course-title">
            <span>الأسبوع الثالث - الفصل الأول</span>
            <span className="course-content-icon">🔗</span>
          </div>
          <p className="course-description">التاريخ الإسلامي - الفصل الثالث...</p>
        </div>
      </div>
      </>
  );
};

export default InvoiceTable;
