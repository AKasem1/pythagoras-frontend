import React, { useState } from 'react';

const Payment = () => {
    const [amount, setAmount] = useState('435.00');
    const [selectedCard, setSelectedCard] = useState('8845');

    return (
        <div className="payment-form-container">
            <div className="payment-card">
                <h2 className="payment-title">Pay by card</h2>

                <div className="payment-section">
                    <label className="payment-label">Amount</label>
                    <div className="payment-amount-options">
                        <label className="payment-radio">
                            <span>Enter amount</span>
                            <input type="text" className="payment-input" placeholder="$0.00" disabled />
                            <input type="radio" name="amount" value="custom" /> 
                        </label>
                        <label className="payment-radio">
                            <span>Unpaid balance</span>
                            <span className="payment-balance">${amount}</span>
                            <input type="radio" name="amount" value="full" checked /> 
                        </label>
                    </div>
                </div>

                <div className="payment-section">
                    <label className="payment-label">Payment method</label>
                    <div className="payment-method-options">
                        <label className="payment-radio">
                            <span className="payment-card-info">Last time used: Thu, Mar 18 2021</span>
                                <span>Ending in ...8845</span>
                            <div>
                                <input 
                                    type="radio" 
                                    name="card" 
                                    value="8845" 
                                    checked={selectedCard === '8845'} 
                                    onChange={() => setSelectedCard('8845')}
                                />
                            </div>
                        </label>
                        <label className="payment-radio">
                            <span className="payment-card-info">Never used</span>
                            <span>Ending in ...7172</span>
                            <div>
                                <input 
                                    type="radio" 
                                    name="card" 
                                    value="7172" 
                                    checked={selectedCard === '7172'} 
                                    onChange={() => setSelectedCard('7172')}
                                />
                            </div>
                        </label>
                        <button className="add-card-button">Add new card</button>
                    </div>
                </div>

                <div className="payment-section">
                    <label className="payment-label">Reference</label>
                    <input type="text" className="payment-input" placeholder="Optionally, add a reference note" />
                </div>

                <div className="payment-total-section">
                    <span className="payment-total-label">الإجمالي</span>
                    <span className="payment-total-amount">${amount}</span>
                </div>
                <div className="payment-actions">
                    <button className="payment-cancel-button">Cancel</button>
                    <button className="payment-pay-button">Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
