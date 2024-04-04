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
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-center my-4">Michelin Star Restaurants in SF</h1>
    <div className="flex flex-col md:flex-row md:-mx-2">
      <div className="md:w-1/2 md:px-2">
        <SellForm restaurants={restaurants} onReservationSubmit={fetchReservations} />
      </div>
      <div className="md:w-1/2 md:px-2 mt-4 md:mt-0">
        <ReservationsList reservations={reservations} fetchReservations={fetchReservations} />
      </div>
    </div>
    <RestaurantsList restaurants={restaurants} />
  </div>
  );
};

export default App;
