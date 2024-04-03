import React from 'react';

const RestaurantsList = ({ restaurants }) => {
  return (
    <div>
      <h2>Restaurant List:</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.restaurantid}>
            <strong>{restaurant.name}</strong> - {restaurant.location} - {restaurant.starrating} stars - {restaurant.cuisine}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsList;