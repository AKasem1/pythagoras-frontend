import React from 'react';

const GradeCard = ({ title, subtitle, Component, color, onClick }) => {
  return (
        <div className="card">
            <div className="slide slide1" style={{backgroundColor: color}} onClick={onClick}>
                <div className="content">
                    <div className="icon">
                    <img src={Component} alt="icon" className='gradeImage'/>
                    </div>
                </div>
            </div>
            <div className="slide slide2">
                <div className="content">
                    <h3>
                       {title}
                    </h3>
                    <p>{subtitle}</p>
                </div>
            </div>
        </div>
  );
};

export default GradeCard;