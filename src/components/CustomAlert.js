import React from 'react';

const CustomAlert = ({ message, type }) => {
  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
};

export default CustomAlert;
