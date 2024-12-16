import React, { useState, useEffect } from 'react';

const Wallet = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="walletPopup-overlay">
        <div className="walletPopup-container">
          <button className="walletPopup-closeButton" onClick={onClose}>
            &times;
          </button>
          <div className="walletPopup-content">
            {/* Your Wallet component content here */}
            <h2>Your Wallet</h2>
            {/* Add Wallet content */}
          </div>
        </div>
      </div>
    );
  };
  

export default Wallet;