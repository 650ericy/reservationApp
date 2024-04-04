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
      email,
      creditCardInfo,
      specialRequests,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Purchase Reservation: {reservation.reservationid}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {reservation.restaurant_name} on {new Date(reservation.date).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })} at {new Date('1970-01-01T' + reservation.time + 'Z').toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}
            </p>
            <p className="text-sm text-gray-500">Price: ${reservation.price}</p>
            <p className="text-sm text-gray-500">Number of People: {reservation.numberofpeople}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="creditCardInfo">Credit Card Information</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={creditCardInfo} onChange={(e) => setCreditCardInfo(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialRequests">Special Requests</label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)}></textarea>
              </div>
              <div className="mb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit Purchase</button>
              </div>
            </form>
          </div>
          <div className="mb-2">
            <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button" onClick={onClose}>&times; Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
