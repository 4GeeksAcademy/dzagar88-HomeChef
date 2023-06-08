import React, { useState } from 'react';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleAmountChange = e => {
    setAmount(e.target.value);
  };

  const handleRecipientChange = e => {
    setRecipient(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    
    const payment = {
      amount: parseFloat(amount),
      recipient: recipient,
    };

    
    fetch('payment-service-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    })
      .then(response => response.json())
      .then(data => {
        
        console.log(data);
       
        setAmount('');
        setRecipient('');
      })
      .catch(error => {
        
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Recipient:</label>
          <input
            type="text"
            value={recipient}
            onChange={handleRecipientChange}
            required
          />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default PaymentForm;
