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
};

// Define the structure of the object you're sending on purchase.
// Update this type according to your actual data structure.
type PurchaseData = {
  reservationId: number;
  email: string;
  creditCardInfo: string;
  specialRequests: string;
};

type ReservationsListProps = {
  reservations: Reservation[];
  fetchReservations: () => void;
};

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations, fetchReservations }) => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handlePurchaseClick = (reservationId: number): void => {
    const reservationData = reservations.find(res => res.reservationid === reservationId);
    setSelectedReservation(reservationData || null);
  };

  const handlePurchase = (purchaseData: PurchaseData): void => {
    axios.post('/create-transaction', purchaseData)
      .then(() => {
        fetchReservations(); // Refresh the reservations list
        setSelectedReservation(null); // Close the purchase form
      })
      .catch(error => {
        console.error('Error creating transaction:', error);
        alert('Failed to create transaction.');
      });
  };

  return (
    <div>
      <h1>Reservations</h1>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Restaurant Name</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Number of People</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservationid}>
              <td>{reservation.reservationid}</td>
              <td>{reservation.restaurant_name}</td>
              <td>{reservation.name}</td>
              <td>{new Date(reservation.date).toLocaleDateString("en-US")}</td>
              <td>{reservation.time}</td>
              <td>{reservation.price}</td>
              <td>{reservation.numberofpeople}</td>
              <td><button onClick={() => handlePurchaseClick(reservation.reservationid)}>Purchase Now</button></td>
            </tr>
          ))}
        </tbody>
      </table>
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
