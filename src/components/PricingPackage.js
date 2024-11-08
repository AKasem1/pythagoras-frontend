import React from 'react';
import { Link } from 'react-router-dom';

const PricingPackage = ({ title, price, courseId, details, image }) => {
  return (
    // <div className="pricing-package">
    //   <div className="price">
    //     <img src={image} alt="price tag"/>
    //   </div>
    //   <h3>{title}</h3>
    //   <ul className="details">
    //     {details.map((detail, index) => (
    //       <li key={index}>{detail}</li>
    //     ))}
    //   </ul>
    //   <Link className="subscribe-btn" to={`/invoice/${courseId}`}>{price}</Link>
    // </div>
    <div className="course-card">
        <div className="course-card-header">Pythagoras Academy</div>
        <div className="course-card-body">
        <div className="thumb">
          <img src={image} alt="thumbail"/>
        </div>
            <h2>{title}</h2>
            <p>بناء على اختياراتك في الأسئلة السابقة</p>
            <ul className="specialties-list">
            {details.map((detail, index) => (
          <li key={index}><span className="checkmark">🗸</span>{detail}</li>
        ))}
            </ul>
            <Link className="pay-button" to={`/invoice/${courseId}`}>{price}</Link>
        </div>
    </div>
  );
};

export default PricingPackage;
