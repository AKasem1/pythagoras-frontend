import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const StudentsAccounts = () => {
    const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`${port}/admin/students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStudents(data);
                } else {
                    console.error("Expected an array, but received:", data);
                }
            })
            .catch(err => console.log(err));
    }, [token]);


    return (
        <div className="students-accounts">
            <h1>حسابات الطلاب</h1>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>البريد الإلكتروني</th>
                        <th>رقم التليفون</th>
                        <th>المراحلة</th>
                        <th>إجمالي المستحقات</th>
                        <th>المدفوع</th>
                        <th>المتبقي</th>
                    </tr>
                </thead>
                <tbody>
                    {students? students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                                {student.evaluations[0].course_id.grade.name}
                            </td>
                            <td>{student.earnings}</td>
                            <td>{student.paid}</td>
                            <td>{student.balance}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsAccounts;
