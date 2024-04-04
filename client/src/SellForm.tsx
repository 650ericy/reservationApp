import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

type Restaurant = {
  restaurantid: number;
  name: string;

};

// define prop types
type SellFormProps = {
  restaurants: Restaurant[];
  onReservationSubmit: () => void;
};

type FormDataState = {
  restaurantId: string;
  name: string;
  date: string;
  time: string;
  price: string;
  numberOfPeople: string;
  email: string;
};

const SellForm: React.FC<SellFormProps> = ({ restaurants, onReservationSubmit }) => {
  const initialFormData: FormDataState = {
    restaurantId: '',
    name: '',
    date: '',
    time: '',
    price: '',
    numberOfPeople: '',
    email: '',
  };

  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('restaurant_id', formData.restaurantId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('time', formData.time);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('number_of_people', formData.numberOfPeople);
    formDataToSend.append('email', formData.email);
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      await axios.post('/sell', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Reservation added successfully!');
      setFormData(initialFormData); // reset form
      setImage(null); // reset image
      if (onReservationSubmit) onReservationSubmit();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to submit reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="restaurantId">
      Restaurant:
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        id="restaurantId"
        name="restaurantId"
        value={formData.restaurantId}
        onChange={handleChange}
        required
      >
        <option value="">Select a restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.restaurantid} value={restaurant.restaurantid}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
      Your Name:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        name="name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
      Date:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
      Time:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="time"
        name="time"
        type="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
      Price:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfPeople">
      Number of People:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="numberOfPeople"
        name="numberOfPeople"
        type="number"
        value={formData.numberOfPeople}
        onChange={handleChange}
        required
      />
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
      Email:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
      Upload Image:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
    </label>
  </div>
  <div className="flex items-center justify-between">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Submit
    </button>
  </div>
</form>
  );
};

export default SellForm;
