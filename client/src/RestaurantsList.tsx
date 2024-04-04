import React, { useState } from 'react';

type Restaurant = {
  restaurantid: number;
  name: string;
  location: string;
  starrating: number;
  cuisine: string;
};

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList: React.FC<RestaurantsListProps> = ({ restaurants }) => {
  const [filter, setFilter] = useState({ cuisine: '', starrating: 0 });
  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)));
  const starRatings = Array.from(new Set(restaurants.map((r) => r.starrating)));

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, cuisine: e.target.value }));
  };

  const handleStarRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, starrating: Number(e.target.value) }));
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      (filter.cuisine ? restaurant.cuisine === filter.cuisine : true) &&
      (!filter.starrating || restaurant.starrating === filter.starrating)
    );
  });

  return (
    <div className="w-full lg:w-1/2">
      <h2 className="text-lg font-semibold">Restaurant List:</h2>
      <div className="my-4">
        <label htmlFor="cuisine" className="mr-2">Filter by cuisine:</label>
        <select
          id="cuisine"
          value={filter.cuisine}
          onChange={handleCuisineChange}
          className="p-2 border rounded"
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>
      </div>
      <div className="my-4">
        <label htmlFor="starrating" className="mr-2">Filter by star rating:</label>
        <select
          id="starrating"
          value={filter.starrating}
          onChange={handleStarRatingChange}
          className="p-2 border rounded"
        >
          <option value={0}>All Ratings</option>
          {starRatings.map((rating) => (
            <option key={rating} value={rating}>{rating} stars</option>
          ))}
        </select>
      </div>
      <ul className="list-disc list-inside">
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant.restaurantid} className="mb-2">
            <strong>{restaurant.name}</strong> - {restaurant.location} - {restaurant.starrating} stars - {restaurant.cuisine}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsList;