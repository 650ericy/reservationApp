import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellForm from './SellForm';
import ReservationsList from './ReservationsList';
import RestaurantsList from './RestaurantsList';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

  // fetch n mount
  useEffect(() => {
    fetchRestaurants();
    fetchReservations();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

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
