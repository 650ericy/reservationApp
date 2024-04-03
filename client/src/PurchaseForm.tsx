import React, { useState, FormEvent } from 'react';
import axios from 'axios';

type Reservation = {
  reservationid: number;
  restaurant_name: string;
  date: string;
  time: string;
  price: string;
  numberofpeople: number;
};

type PurchaseFormProps = {
  reservation: Reservation;
  onPurchase: (purchaseData: any) => void;
  onClose: () => void;
};

const PurchaseForm: React.FC<PurchaseFormProps> = ({ reservation, onPurchase, onClose }) => {
  const [email, setEmail] = useState('');
  const [creditCardInfo, setCreditCardInfo] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPurchase({
      reservationId: reservation.reservationid,
      email: email,
      creditCardInfo: creditCardInfo,
      specialRequests: specialRequests,
    });
  };

  return (
    <div className="purchase-modal">
      <div className="purchase-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Purchase Reservation: {reservation.reservationid}</h2>
        <form onSubmit={handleSubmit}>
          <p>{reservation.restaurant_name}</p>
          <p>Date: {new Date(reservation.date).toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
          <p>Time: {reservation.time}</p>
          <p>Price: {reservation.price}</p>
          <p>Number of People: {reservation.numberofpeople}</p>
          <label>Email:<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Credit Card Information:<input type="text" value={creditCardInfo} onChange={(e) => setCreditCardInfo(e.target.value)} required /></label>
          <label>Special Requests:<textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)}></textarea></label> {/* Add special requests field */}
          <button type="submit">Submit Purchase</button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
