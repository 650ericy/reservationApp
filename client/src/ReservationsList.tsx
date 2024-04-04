import React, { useState } from 'react';
import axios from 'axios';
import PurchaseForm from './PurchaseForm';

type Reservation = {
  reservationid: number;
  restaurant_name: string;
  name: string;
  date: string;
  time: string;
  price: string;
  numberofpeople: number;
  isPurchased: boolean;
};

type PurchaseData = {
  reservationId: number;
  email: string;
  creditCardInfo: string;
  specialRequests: string;
};

type ReservationsListProps = {
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  fetchReservations: () => void;
};

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations, setReservations, fetchReservations }) => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handlePurchaseClick = (reservationId: number): void => {
    const reservationData = reservations.find(res => res.reservationid === reservationId);
    setSelectedReservation(reservationData || null);
  };

  const handlePurchase = (purchaseData: PurchaseData): void => {
    axios.post('/create-transaction', purchaseData)
      .then(() => {
        const updatedReservations = reservations.filter(res => res.reservationid !== purchaseData.reservationId);
        setReservations(updatedReservations);
        setSelectedReservation(null);
      })
      .catch(error => {
        console.error('Error creating transaction:', error);
        alert('Failed to create transaction.');
      });
  };

  return (
    <div className="overflow-auto max-h-[500px]">
      <h1>Reservations</h1>
      <div className="min-w-full">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Reservation ID</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Restaurant Name</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Name</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Date</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Time</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Price</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Number of People</th>
              <th className="p-3 text-xs font-semibold tracking-wide text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {reservations.filter(res => !res.isPurchased).map((reservation) => {
              const formattedDate = new Date(reservation.date).toLocaleDateString("en-US");
              const formattedTime = new Date('1970-01-01T' + reservation.time + 'Z').toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });

              return (
                <tr key={reservation.reservationid} className="text-gray-700">
                  <td className="p-3">{reservation.reservationid}</td>
                  <td className="p-3">{reservation.restaurant_name}</td>
                  <td className="p-3">{reservation.name}</td>
                  <td className="p-3">{formattedDate}</td>
                  <td className="p-3">{formattedTime}</td>
                  <td className="p-3">${reservation.price}</td>
                  <td className="p-3">{reservation.numberofpeople}</td>
                  <td className="p-3">
                    <button onClick={() => handlePurchaseClick(reservation.reservationid)} className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 border border-blue-700 rounded shadow">
                      Purchase Now
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedReservation && (
        <PurchaseForm
          reservation={selectedReservation}
          onPurchase={handlePurchase}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};

export default ReservationsList;
