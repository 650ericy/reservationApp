import React from 'react';

// Define the type for a single restaurant
type Restaurant = {
  restaurantid: number;
  name: string;
  location: string;
  starrating: number;
  cuisine: string;
};

// Define the props type for the component
type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList: React.FC<RestaurantsListProps> = ({ restaurants }) => {
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