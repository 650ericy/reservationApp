import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Define the type for a single restaurant
type Restaurant = {
  restaurantid: number;
  name: string;
  // Add other necessary fields...
};

// Define the props type for the component
type SellFormProps = {
  restaurants: Restaurant[];
  onReservationSubmit: () => void;
};

// Define the type for the form data state
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
  const [formData, setFormData] = useState<FormDataState>({
    restaurantId: '',
    name: '',
    date: '',
    time: '',
    price: '',
    numberOfPeople: '',
    email: '',
  });

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
      onReservationSubmit(); // Invoke the callback after successful submission
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to submit reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Restaurant:
        <select name="restaurantId" value={formData.restaurantId} onChange={handleChange} required>
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.restaurantid} value={restaurant.restaurantid}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <label>
        Time:
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <label>
        Number of People:
        <input type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Upload Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SellForm;
