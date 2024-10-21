import React from 'react';
import { Link } from 'react-router-dom';

const PricingPackage = ({ title, price, courseId, details, image }) => {
  return (
    <div className="pricing-package">
      <div className="price">
        <img src={image} alt="price tag"/>
      </div>
      <h3>{title}</h3>
      <ul className="details">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <Link className="subscribe-btn" to={`/invoice/${courseId}`}>{price}</Link>
    </div>
  );
};

export default PricingPackage;
