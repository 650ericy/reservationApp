import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellForm from './SellForm';
import ReservationsList from './ReservationsList';
import RestaurantsList from './RestaurantsList';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Fetching restaurants and reservations on component mount
  useEffect(() => {
    fetchRestaurants();
    fetchReservations();
  }, []);

  // Function to fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Function to fetch reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get('/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // The SellForm component is passed the restaurants and a callback function to trigger after a reservation is added
  // The ReservationsList component is passed the current reservations and the fetch function to allow refreshing the list
  return (
    <div>
      <h1>Michelin Star Restaurants in SF</h1>
      <SellForm restaurants={restaurants} onReservationSubmit={fetchReservations} />
      <ReservationsList reservations={reservations} fetchReservations={fetchReservations} />
      <RestaurantsList restaurants={restaurants} />
    </div>
  );
};

export default App;
